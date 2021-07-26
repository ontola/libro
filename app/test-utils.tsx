import { ThemeProvider } from '@material-ui/styles';
import { Quad } from '@ontologies/core';
import { Queries, queries } from '@testing-library/dom';
import {
  RenderOptions,
  RenderResult,
  render,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import {
  ComponentRegistration,
  RDFStore,
  toGraph,
} from 'link-lib';
import BasicStore from 'link-lib/dist-types/store/BasicStore';
import { RenderStoreProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MediaQueryAllQueryable, Context as ResponsiveContext } from 'react-responsive';
import { Router } from 'react-router';
import { ParsedObject } from 'link-lib/dist-types/types';

import { componentRegistrations } from './components';
import { AppContextProvider } from './appContext';
import { getWebsiteContextFromWebsite } from './helpers/app';
import { retrievePath } from './helpers/iris';
import { generateCtx } from './helpers/link-redux/fixtures';
import { isFunction } from './helpers/types';
import { WebsiteContext } from './location';
import configureStore from './state';
import themes from './themes';
import englishMessages from './translations/en.json';
import { getViews } from './views';
import { TestContext } from './helpers/link-redux/utilities';

interface WrapProviderOpts {
  ctx: Partial<TestContext> & Required<Pick<TestContext, 'history'>> & Required<Pick<TestContext, 'lrs'>>;
  location?: string;
  viewPort?: Partial<MediaQueryAllQueryable>;
  views?: Array<ComponentRegistration<any> | Array<ComponentRegistration<any>>>;
}

type WrapProviders = (opts: WrapProviderOpts) => React.ComponentType;

const wrapProviders: WrapProviders = ({
  ctx,
  location,
  viewPort = { width: 800 },
  views,
}: WrapProviderOpts) => {
  if (Array.isArray(views)) {
    if (!ctx.lrs) {
      throw new Error('Views passed without LRS');
    }

    ctx.lrs.registerAll(...views);
  }

  const subjPath = ctx?.subject?.value && retrievePath(ctx.subject?.value);
  ctx.history.push(location || subjPath || '/');

  const TestWrapper = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <Provider store={configureStore(ctx.history)}>
      <ResponsiveContext.Provider value={viewPort}>
        <WebsiteContext.Provider value={getWebsiteContextFromWebsite('https://example.com/')}>
          <AppContextProvider lrs={ctx.lrs}>
            <HelmetProvider context={{}}>
              <RenderStoreProvider value={ctx?.lrs}>
                <IntlProvider
                  locale="en"
                  messages={englishMessages}
                >
                  <ThemeProvider theme={themes.common({})}>
                    <Router history={ctx.history}>
                      {children}
                    </Router>
                  </ThemeProvider>
                </IntlProvider>
              </RenderStoreProvider>
            </HelmetProvider>
          </AppContextProvider>
        </WebsiteContext.Provider>
      </ResponsiveContext.Provider>
    </Provider>
  );

  TestWrapper.propTypes = {
    children: PropTypes.element,
  };

  return TestWrapper;
};

const resourcesToGraph = (resources: Quad[]): ParsedObject => {
  if (Array.isArray(resources)) {
    const graphs = resources.map((r) => toGraph(r));
    const mainIRI = graphs[0][0];
    const store = new RDFStore().getInternalStore();

    for (const g of graphs) {
      const s = g[1];
      store.addQuads((s as BasicStore).quads);
    }

    const dataObjects = graphs.reduce((acc, [, , namedBlobTuple]) => [...acc, ...namedBlobTuple], []);

    return [mainIRI, store, dataObjects];
  }

  return toGraph(resources);
};

export type BasicRenderResult<Q extends Queries, Container extends Element | DocumentFragment> = RenderResult<Q, Container>;

export type ViewRenderResult<Q extends Queries, Container extends Element | DocumentFragment> = RenderResult<Q, Container>
  & TestContext
  & { iri: Node };

export interface ViewRenderOptions<Q extends Queries, Container extends Element | DocumentFragment> extends RenderOptions<Q, Container> {
  resources?: Node[] | undefined;
  location?: string | undefined;
}

type RenderReturn<
  Q extends Queries,
  Container extends Element | DocumentFragment,
  O,
> = O extends { resources: undefined } ? BasicRenderResult<Q, Container> : ViewRenderResult<Q, Container>;

const customRender = async <
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
>(
  ui: React.ReactElement,
  opts: Omit<ViewRenderOptions<Q, Container>, 'queries'> = {},
): Promise<RenderReturn<Q, Container, typeof opts>> => {
  const {
    resources,
    location,
    ...options
  } = opts;

  // Basic unit testing
  if (typeof resources === 'undefined') {
    return render<Q, Container>(ui, {
      wrapper: wrapProviders({
        ctx: {
          history: createMemoryHistory({ initialEntries: [location || '/'] }),
        },
        location,
      }),
      ...options,
    }) as RenderReturn<Q, Container, typeof opts>;
  }

  const [iri, graph] = resourcesToGraph(resources);
  const ctx = await generateCtx(graph, iri);

  const result: RenderResult<Q, Container> = render(
    isFunction(ui) ? ui({ iri }):ui,
    {
      wrapper: wrapProviders({
        ctx,
        location,
        views: [...getViews(), ...componentRegistrations()],
      }),
      ...options,
    },
  );

  return {
    iri,
    ...result,
    ...ctx,
  } as unknown as RenderReturn<Q, Container, typeof opts>;
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

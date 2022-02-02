import { ThemeProvider } from '@material-ui/styles';
import { Node, QuadPosition } from '@ontologies/core';
import { Queries, queries } from '@testing-library/dom';
import {
  RenderOptions,
  RenderResult,
  render,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import {
  ComponentRegistration,
  DataObject,
  RDFIndex,
  RDFStore,
  createStore,
  toGraph,
} from 'link-lib';
import {
  NamedBlobTuple,
  ParsedObject,
  SomeNode,
} from 'link-lib/dist-types/types';
import { RenderStoreProvider } from 'link-redux';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Context as ResponsiveContext } from 'react-responsive';
import { Router } from 'react-router';

import { AppContextProvider } from './AppContextProvider';
import { componentRegistrations } from './components';
import { getWebsiteContextFromWebsite } from './helpers/app';
import { defaultManifest } from './helpers/defaultManifest';
import { retrievePath } from './helpers/iris';
import { generateCtx } from './helpers/link-redux/fixtures';
import { isFunction } from './helpers/types';
import { WebsiteContext } from './location';
import configureStore from './state';
import { OmniformState, omniformContext } from './state/omniform';
import themes from './themes';
import englishMessages from './lang/en.json';
import { getViews } from './views';

interface WrapProvidersArgs {
  ctx: any;
  location: any;
  viewPort?: any;
  views?: Array<ComponentRegistration<any> | Array<ComponentRegistration<any>>>;
}

interface ChildrenProps {
  children: React.ReactElement;
}

const allViews = () => [...getViews(), ...componentRegistrations()];

const wrapProviders = ({
  ctx,
  location,
  viewPort = { width: 800 },
  views,
}: WrapProvidersArgs): React.ComponentType<ChildrenProps> => {
  const isUnit = !ctx.lrs;
  const lrs = ctx.lrs ?? createStore();

  if (!isUnit && Array.isArray(views)) {
    lrs.registerAll(...views);
  }

  const subjPath = ctx?.subject?.value && retrievePath(ctx.subject?.value);
  ctx.history.push(location || subjPath || '/');

  const websiteContext = getWebsiteContextFromWebsite('https://example.com/');
  const manifest = defaultManifest(websiteContext.websiteIRIStr);

  const TestWrapper = ({ children }: ChildrenProps): JSX.Element => {
    const routerOrChildren = !isUnit ? (
      <Router history={ctx.history}>
        {children}
      </Router>
    ) : children;

    const [omniformState, setOmniformState] = React.useState<OmniformState>({ });

    const omniformStateMemo = React.useMemo(() => ({
      omniformState,
      setOmniformState,
    }), [omniformState, setOmniformState]);

    return (
      <Provider store={configureStore(ctx.history)}>
        <ResponsiveContext.Provider value={viewPort}>
          <WebsiteContext.Provider value={websiteContext}>
            <AppContextProvider
              lrs={ctx?.lrs}
              manifest={manifest}
            >
              <HelmetProvider context={{}}>
                <RenderStoreProvider value={lrs}>
                  <omniformContext.Provider value={omniformStateMemo}>
                    <IntlProvider
                      locale="en"
                      messages={englishMessages}
                    >
                      <ThemeProvider theme={themes.common({})}>
                        {routerOrChildren}
                      </ThemeProvider>
                    </IntlProvider>
                  </omniformContext.Provider>
                </RenderStoreProvider>
              </HelmetProvider>
            </AppContextProvider>
          </WebsiteContext.Provider>
        </ResponsiveContext.Provider>
      </Provider>
    );
  };

  return TestWrapper;
};

export const resourcesToGraph = (resources: DataObject | DataObject[]): ParsedObject => {
  if (Array.isArray(resources)) {
    const graphs = resources.map((r) => toGraph(r) as [SomeNode, RDFIndex, NamedBlobTuple[]]);
    const mainIRI = graphs[0][0];
    const store = new RDFStore().getInternalStore();

    for (const [, graph] of graphs) {
      for (const s of graph.quads) {
        store.add(
          s[QuadPosition.subject],
          s[QuadPosition.predicate],
          s[QuadPosition.object],
          s[QuadPosition.graph],
        );
      }
    }

    const dataObjects = graphs.reduce<NamedBlobTuple[]>(
      (acc, [, , namedBlobTuple]) => [...acc, ...namedBlobTuple],
      [],
    );

    return [mainIRI, store, dataObjects];
  }

  return toGraph(resources);
};

interface TestRenderOpts {
  location?: any;
}

interface LinkedTestRenderOpts extends TestRenderOpts {
  resources?: any;
  views?: Array<ComponentRegistration<any> | Array<ComponentRegistration<any>>>
}

export const renderLinked = async <
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  >(
  ui: ((props: { iri: Node }) => React.ReactElement) | React.ReactElement,
  opts: LinkedTestRenderOpts & RenderOptions<Q, Container> = {},
): Promise<RenderResult<Q, Container>> => {
  const {
    resources,
    location,
    ...options
  } = opts;

  const [iri, graph] = resourcesToGraph(resources);
  const ctx = await generateCtx(graph, iri);

  const wrapper = wrapProviders({
    ctx,
    location,
    views: opts.views ?? allViews(),
  });

  const result = render(
    isFunction(ui) ? ui({ iri }) : ui,
    {
      wrapper,
      ...options,
    },
  );

  return {
    iri,
    ...result,
    ...ctx,
  };
};

const renderWithWrappers = <
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
>(
    ui: React.ReactElement,
    opts: TestRenderOpts & RenderOptions<Q, Container> = {},
  ): RenderResult<Q, Container> => {
  const {
    location,
    ...options
  } = opts;

  const wrapper = wrapProviders({
    ctx: {
      history: createMemoryHistory({ initialEntries: [location || '/'] }),
    },
    location,
    views: undefined,
  });

  return render(ui, {
    wrapper,
    ...options,
  });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithWrappers as render };

import { ThemeProvider } from '@material-ui/styles';
import { Node } from '@ontologies/core';
import { Queries, queries } from '@testing-library/dom';
import {
  RenderOptions,
  RenderResult,
  render,
} from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import { createMemoryHistory } from 'history';
import {
  ComponentRegistration,
  DataObject,
  RDFStore,
  createStore,
  toGraph,
} from 'link-lib';
import RDFIndex from 'link-lib/dist-types/store/RDFIndex';
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
import englishMessages from './lang/en.json';
import { WebsiteContext } from './location';
import configureStore from './state';
import themes from './themes';
import { SCREENSIZE } from './themes/common/theme/variables';
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

export enum ScreenWidth {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
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
                  <IntlProvider
                    locale="en"
                    messages={englishMessages}
                  >
                    <ThemeProvider theme={themes.common({})}>
                      {routerOrChildren}
                    </ThemeProvider>
                  </IntlProvider>
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

    for (const g of graphs) {
      const s = g[1];
      store.addQuads(s.quads);
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
  const ctx = await generateCtx(graph as RDFIndex, iri);

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

const createMatchMedia = (width: number) => (query: string): MediaQueryList => ({
  addEventListener: jest.fn(),
  addListener: () => jest.fn(),
  dispatchEvent: jest.fn(),
  matches: mediaQuery.match(query, { width }),
  media: query,
  onchange: null,
  removeEventListener: jest.fn(),
  removeListener: () => jest.fn(),
});

/**
 * Sets the window innerWidth and mocks [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
 * so that [useMediaQuery](https://v4.mui.com/components/use-media-query/) will function like expected.
 *
 * !IMPORTANT Don't forget to add an `afterEach` to your test where you call `mockScreenWidth()` to reset the screen size to it's default.
 * @param screenSize Size of the screen. Leave empty for default screensize. These values correspond to the breakpoints set in the common theme.
 */
export const mockScreenWidth = (screenSize: ScreenWidth = ScreenWidth.SM): void => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: SCREENSIZE[screenSize],
    writable: true,
  });

  Object.defineProperty(window, 'matchMedia', {
    value: createMatchMedia(window.innerWidth),
    writable: true,
  });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithWrappers as render };

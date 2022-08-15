import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { Node, QuadPosition } from '@ontologies/core';
import {
  Matcher,
  MatcherOptions,
  Queries,
  queries,
} from '@testing-library/dom';
import {
  RenderOptions,
  RenderResult,
  buildQueries,
  queryHelpers,
  render,
} from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { History, createMemoryHistory } from 'history';
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
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import { Module } from '../app/Module';
import { AppContextProvider } from '../app/modules/Kernel/components/AppContext/AppContextProvider';
import HighlightProvider from '../app/modules/Common/components/HighlightProvider/HighlightProvider';
import WebsiteContextProvider, { getWebsiteContextFromWebsite } from '../app/modules/Kernel/components/WebsiteContext/WebsiteContextProvider';
import { defaultManifest } from '../app/helpers/defaultManifest';
import { retrievePath } from '../app/modules/Common/lib/iris';
import { isFunction } from '../app/modules/Kernel/lib/typeCheckers';
import englishMessages from '../app/lang/en.json' assert { type: 'json' };
import themes from '../app/themes';
import { getViews } from '../app/views';

import { generateCtx } from './link-redux/fixtures';

interface WrapProvidersArgs {
  ctx: any;
  location: any;
  modules: Module[];
  viewPort?: any;
  views?: Array<ComponentRegistration<any> | Array<ComponentRegistration<any>>>;
}

interface ChildrenProps {
  children: React.ReactElement;
}

const allViews = async (modules: Module[]) => {
  // eslint-disable-next-line no-inline-comments
  const cr = await import(/* webpackChunkName: "TestModules" */'../app/components');

  return [...getViews(modules), ...cr.componentRegistrations()];
};

const wrapProviders = async ({
  ctx,
  location,
  modules,
  views,
}: WrapProvidersArgs): Promise<React.ComponentType<ChildrenProps>> => {
  const isUnit = !ctx.lrs;
  const lrs = ctx.lrs ?? createStore();

  if (!isUnit && Array.isArray(views)) {
    lrs.registerAll(...views);
  }

  const subjPath = ctx?.subject?.value && retrievePath(ctx.subject?.value);
  ctx.history.push(location || subjPath || '/');

  const websiteContext = getWebsiteContextFromWebsite('https://example.com/');
  const manifest = defaultManifest(websiteContext.websiteIRIStr);

  const OFProvider = modules.find((m) => m.name === 'Omniform')
    // eslint-disable-next-line import/dynamic-import-chunkname
    ? (await import('../app/modules/Omniform/components/OmniformProvider')).default
    : React.Fragment;

  const TestWrapper = ({ children }: ChildrenProps): JSX.Element => {
    const routerOrChildren = !isUnit ? (
      <HistoryRouter history={ctx.history as History}>
        {children}
      </HistoryRouter>
    ) : children;

    return (
      <AppContextProvider
        lrs={ctx?.lrs}
        manifest={manifest}
        modules={modules}
      >
        <WebsiteContextProvider websiteCtxOverride={websiteContext}>
          <HelmetProvider context={{}}>
            <RenderStoreProvider value={lrs}>
              <OFProvider>
                <HighlightProvider>
                  <IntlProvider
                    locale="en"
                    messages={englishMessages}
                  >
                    <StyledEngineProvider injectFirst>
                      <ThemeProvider theme={themes.common({})}>
                        {routerOrChildren}
                      </ThemeProvider>
                    </StyledEngineProvider>
                  </IntlProvider>
                </HighlightProvider>
              </OFProvider>
            </RenderStoreProvider>
          </HelmetProvider>
        </WebsiteContextProvider>
      </AppContextProvider>
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

export interface TestRenderOpts {
  location?: any;
  modules?: Module[];
}

export interface LinkedTestRenderOpts extends TestRenderOpts {
  resources?: any;
  views?: Array<ComponentRegistration<any> | Array<ComponentRegistration<any>>>;
}

export const renderLinked = async <
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  >(
  ui: ((props: { iri: Node; }) => React.ReactElement) | React.ReactElement,
  opts: LinkedTestRenderOpts & RenderOptions<Q, Container> = {},
): Promise<RenderResult<Q, Container>> => {
  const {
    resources,
    location,
    ...options
  } = opts;

  const [iri, graph] = resourcesToGraph(resources);
  // eslint-disable-next-line no-inline-comments
  const modules = opts.modules ?? [];
  const ctx = await generateCtx(modules, graph, iri);

  const wrapper = await wrapProviders({
    ctx,
    location,
    modules,
    views: opts.views ?? await allViews(modules),
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

const renderWithWrappers = async <
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  >(
  ui: React.ReactElement,
  opts: TestRenderOpts & RenderOptions<Q, Container> = {},
): Promise<RenderResult<Q, Container>> => {
  const {
    location,
    ...options
  } = opts;
  // eslint-disable-next-line no-inline-comments
  const modules = opts.modules ?? [];

  const wrapper = await wrapProviders({
    ctx: {
      history: createMemoryHistory({ initialEntries: [location || '/'] }),
    },
    location,
    modules,
    views: undefined,
  });

  return render(ui, {
    wrapper,
    ...options,
  });
};

export const mockStorage = (initialValues: Record<string, string>): [Record<string, string>, Storage] => {
  const store = initialValues;
  const storage = {
    getItem: (key: string): string | null => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
  };

  return [store, storage as Storage];
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithWrappers as render };

const queryAllByImgSrc = (container: HTMLElement, id: Matcher, options?: MatcherOptions): HTMLElement[] =>
  queryHelpers.queryAllByAttribute('src', container, id, options);
const getMultipleError = (_: Element | null, imgSrc: string): string =>
  `Found multiple images with src: ${imgSrc}`;
const getMissingError = (_: Element | null, imgSrc: string): string =>
  `Unable to find an image with src: ${imgSrc}`;

const [
  queryByImgSrc,
  getAllByImgSrc,
  getByImgSrc,
  findAllByImgSrc,
  findByImgSrc,
] = buildQueries(queryAllByImgSrc, getMultipleError, getMissingError);

export const imageQueries = {
  findAllByImgSrc,
  findByImgSrc,
  getAllByImgSrc,
  getByImgSrc,
  queryByImgSrc,
};

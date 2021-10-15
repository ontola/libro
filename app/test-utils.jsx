import { ThemeProvider } from '@material-ui/styles';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { RDFStore, toGraph } from 'link-lib';
import { RenderStoreProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Context as ResponsiveContext } from 'react-responsive';
import { Router } from 'react-router';

import { AppContextProvider } from './AppContextProvider'
import { componentRegistrations } from './components';
import { getWebsiteContextFromWebsite } from './helpers/app';
import { retrievePath } from './helpers/iris';
import { generateCtx } from './helpers/link-redux/fixtures';
import { isFunction } from './helpers/types';
import { WebsiteContext } from './location';
import configureStore from './state';
import themes from './themes';
import englishMessages from './lang/en.json';
import { getViews } from './views';

const wrapProviders = ({
  ctx,
  location,
  viewPort = { width: 800 },
  views,
}) => {
  if (Array.isArray(views)) {
    ctx.lrs.registerAll(...views);
  }

  const subjPath = ctx?.subject?.value && retrievePath(ctx.subject?.value);
  ctx.history.push(location || subjPath || '/');

  const LRSProvider = ctx ? RenderStoreProvider : ({ children }) => children;

  const TestWrapper = ({ children }) => (
    <Provider store={configureStore(ctx.history)}>
      <ResponsiveContext.Provider value={viewPort}>
        <WebsiteContext.Provider value={getWebsiteContextFromWebsite('https://example.com/')}>
          <AppContextProvider lrs={ctx?.lrs}>
            <HelmetProvider context={{}}>
              <LRSProvider value={ctx?.lrs}>
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
              </LRSProvider>
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

const resourcesToGraph = (resources) => {
  if (Array.isArray(resources)) {
    const graphs = resources.map((r) => toGraph(r));
    const mainIRI = graphs[0][0];
    const store = new RDFStore().getInternalStore();

    for (const g of graphs) {
      const s = g[1];
      store.addQuads(s.quads);
    }

    const dataObjects = graphs.reduce((acc, [, , namedBlobTuple]) => [...acc, ...namedBlobTuple], []);

    return [mainIRI, store, dataObjects];
  }

  return toGraph(resources);
};

const customRender = async (ui, {
  resources,
  location,
  ...options
} = {}) => {
  // Basic unit testing
  if (typeof resources === 'undefined') {
    return render(ui, {
      wrapper: wrapProviders({
        ctx: {
          history: createMemoryHistory({ initialEntries: [location || '/'] }),
        },
        location,
      }),
      ...options,
    });
  }

  const [iri, graph] = resourcesToGraph(resources);
  const ctx = await generateCtx(graph, iri);

  const result = render(
    isFunction(ui) ? ui({ iri }) : ui,
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
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

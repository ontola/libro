import { ThemeProvider } from '@material-ui/styles';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { toGraph } from 'link-lib';
import { RenderStoreProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Context as ResponsiveContext } from 'react-responsive';
import { Router } from 'react-router';

import { getWebsiteContextFromWebsite } from './helpers/app';
import { retrievePath } from './helpers/iris';
import { generateCtx } from './helpers/link-redux/fixtures';
import { WebsiteContext } from './location';
import configureStore from './state';
import englishMessages from './translations/en';
import { getViews } from './views';
import themes from './themes';

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
  const history = createMemoryHistory({ initialEntries: [location || subjPath || '/'] });

  const LRSProvider = ctx ? RenderStoreProvider : ({ children }) => children;

  const TestWrapper = ({ children }) => (
    <Provider store={configureStore()}>
      <ResponsiveContext.Provider value={viewPort}>
        <WebsiteContext.Provider value={getWebsiteContextFromWebsite('https://example.com/')}>
          <HelmetProvider context={{}}>
            <LRSProvider value={ctx?.lrs}>
              <IntlProvider locale="en" messages={englishMessages}>
                <ThemeProvider theme={themes.common}>
                  <Router history={history}>
                    {children}
                  </Router>
                </ThemeProvider>
              </IntlProvider>
            </LRSProvider>
          </HelmetProvider>
        </WebsiteContext.Provider>
      </ResponsiveContext.Provider>
    </Provider>
  );

  TestWrapper.propTypes = {
    children: PropTypes.element,
  };

  return TestWrapper;
};

const customRender = (ui, {
  resources,
  location,
  ...options
} = {}) => {
  // Basic unit testing
  if (typeof resources === 'undefined') {
    return render(ui, {
      wrapper: wrapProviders({ location }),
      ...options,
    });
  }
  const [iri, graph] = toGraph(resources);
  const ctx = generateCtx(graph, iri);

  const result = render(
    typeof ui === 'function' ? ui({ iri }) : ui,
    {
      wrapper: wrapProviders({
        ctx,
        location,
        views: getViews(),
      }),
      ...options,
    }
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

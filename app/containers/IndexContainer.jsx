import CssBaseline from '@material-ui/core/CssBaseline';
import createPalette from '@material-ui/core/styles/createPalette';
import { ThemeProvider } from '@material-ui/styles';
import dayjs from 'dayjs';
import 'dayjs/locale/nl';
import 'dayjs/locale/en';
import LinkedRenderStore from 'link-lib';
import { RenderStoreProvider, useLRS } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import { Provider } from 'react-redux';

import { getMetaContent } from '../helpers/arguHelpers';
import AppFrame from '../routes/App';
import themes from '../themes/index';
import englishMessages from '../translations/en.json';
import dutchMessages from '../translations/nl.json';

const propTypes = {
  Router: PropTypes.func,
  lrs: PropTypes.instanceOf(LinkedRenderStore).isRequired,
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
  }).isRequired,
  title: PropTypes.string,
};

const UpdateLRSIntl = ({ children }) => {
  const lrs = useLRS();
  // eslint-disable-next-line no-param-reassign
  const intl = useIntl();
  lrs.intl = intl;

  return children;
};

const IndexContainer = ({
  Router,
  lrs,
  store,
  title,
}) => {
  const selectedLang = lrs.store.langPrefs[0];
  let messages;
  if (selectedLang.includes('nl')) {
    messages = dutchMessages;
    dayjs.locale('nl');
  } else {
    messages = englishMessages;
    dayjs.locale('en');
  }
  const themeName = getMetaContent('theme');
  let theme = themes[themeName] || themes.common;

  if (__CLIENT__ && window.WEBSITE_META) {
    const websiteMeta = window.WEBSITE_META;
    theme = {
      ...theme,
      palette: createPalette({
        ...theme.palette,
        primary: {
          contrastText: websiteMeta.primary_text,
          main: websiteMeta.primary_main,
        },
        secondary: {
          contrastText: websiteMeta.secondary_text,
          main: websiteMeta.secondary_main,
        },
      }),
    };
  }

  return (
    <Provider store={store}>
      <IntlProvider locale={selectedLang} messages={messages}>
        <RenderStoreProvider value={lrs}>
          <UpdateLRSIntl>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Router>
                <AppFrame title={title} />
              </Router>
            </ThemeProvider>
          </UpdateLRSIntl>
        </RenderStoreProvider>
      </IntlProvider>
    </Provider>
  );
};

IndexContainer.propTypes = propTypes;

export default IndexContainer;

import CssBaseline from '@material-ui/core/CssBaseline';
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
import themes from '../themes';
import englishMessages from '../lang/en.json';
import dutchMessages from '../lang/nl.json';

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
  const intl = useIntl();
  const lrs = useLRS();
  lrs.intl = intl;

  return children;
};

const getThemeVariables = () => {
  if (!__CLIENT__ || typeof window.WEBSITE_META === 'undefined' || Object.keys(window.WEBSITE_META).length === 0) {
    return {};
  }
  const websiteMeta = window.WEBSITE_META;
  const palette = {
    link: {
      text: websiteMeta.primary_color,
    },
    primary: {
      main: websiteMeta.primary_color,
    },
    secondary: {
      main: websiteMeta.secondary_color,
    },
  };
  if (websiteMeta.styled_headers) {
    palette.link.header = websiteMeta.primary_color;
  }

  return {
    appBar: {
      background: websiteMeta.header_background,
      color: websiteMeta.header_text,
    },
    palette,
  };
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
  const themeVariables = getThemeVariables();
  const theme = (themes[themeName] || themes.common)(themeVariables);

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

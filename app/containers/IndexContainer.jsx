import CssBaseline from '@material-ui/core/CssBaseline';
import createPalette from '@material-ui/core/styles/createPalette';
import { ThemeProvider } from '@material-ui/styles';
import dayjs from 'dayjs';
import 'dayjs/locale/nl';
import 'dayjs/locale/en';
import LinkedRenderStore from 'link-lib';
import { RenderStoreProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader/root';
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

  const UpdateLRSIntl = ({ children }) => {
    // eslint-disable-next-line no-param-reassign
    lrs.intl = useIntl();

    return children;
  };

  const themeName = getMetaContent('theme');
  let theme = themes[themeName] || themes.common;

  if (__CLIENT__ && window.WEBSITE_META) {
    const websiteMeta = window.WEBSITE_META;
    theme = {
      ...theme,
      palette: createPalette({
        ...theme.palette,
        primary: {
          contrastText: websiteMeta.primaryText,
          main: websiteMeta.primaryMain,
        },
        secondary: {
          contrastText: websiteMeta.secondaryText,
          main: websiteMeta.secondaryMain,
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

export default hot(IndexContainer);

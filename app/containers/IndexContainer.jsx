import createPalette from '@material-ui/core/styles/createPalette';
import dayjs from 'dayjs';
import 'dayjs/locale/nl';
import 'dayjs/locale/en';
import LinkedRenderStore from 'link-lib';
import { RenderStoreProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { addLocaleData, injectIntl, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import nlLocaleData from 'react-intl/locale-data/nl';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import themes from '../themes/index';
import AppFrame from '../routes/App';
import englishMessages from '../translations/en.json';
import dutchMessages from '../translations/nl.json';
import { getMetaContent } from '../helpers/arguHelpers';

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

addLocaleData(enLocaleData);
addLocaleData(nlLocaleData);

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

  const UpdateLRSIntl = injectIntl(({ children, intl }) => {
    // eslint-disable-next-line no-param-reassign
    lrs.intl = intl;

    return children;
  });

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

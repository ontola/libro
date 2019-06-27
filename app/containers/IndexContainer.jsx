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

import theme from '../themes/common/theme';
import AppFrame from '../routes/App';
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

addLocaleData(enLocaleData);
addLocaleData(nlLocaleData);

const IndexContainer = ({
  Router,
  lrs,
  store,
  title,
}) => {
  const selectedLang = lrs.store.langPrefs[0];
  const messages = selectedLang.includes('nl') ? dutchMessages : englishMessages;

  const UpdateLRSIntl = injectIntl(({ children, intl }) => {
    // eslint-disable-next-line no-param-reassign
    lrs.intl = intl;

    return children;
  });

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

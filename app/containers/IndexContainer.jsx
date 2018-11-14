import LinkedRenderStore from 'link-lib';
import { RenderStoreProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { addLocaleData, injectIntl, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import nlLocaleData from 'react-intl/locale-data/nl';
import { Provider } from 'react-redux';

import AppFrame from '../routes/App';
import englishMessages from '../translations/en.json';
import dutchMessages from '../translations/nl.json';

const propTypes = {
  Router: PropTypes.func,
  history: PropTypes.shape({
    go: PropTypes.func,
    goBack: PropTypes.func,
    push: PropTypes.func,
    replace: PropTypes.func,
    transitionTo: PropTypes.func,
  }).isRequired,
  lrs: PropTypes.instanceOf(LinkedRenderStore).isRequired,
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
  }).isRequired,
};

addLocaleData(enLocaleData);
addLocaleData(nlLocaleData);

const IndexContainer = ({
  Router,
  history,
  lrs,
  store,
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
            <Router history={history}>
              <AppFrame />
            </Router>
          </UpdateLRSIntl>
        </RenderStoreProvider>
      </IntlProvider>
    </Provider>
  );
};

IndexContainer.propTypes = propTypes;

export default IndexContainer;

import LinkedRenderStore from 'link-lib';
import { RenderStoreProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import nlLocaleData from 'react-intl/locale-data/nl';
import { Provider } from 'react-redux';

import AppFrame from '../routes/App';
import englishMessages from '../../locales/en.reactIntl.json';
import dutchMessages from '../../locales/nl.reactIntl.json';

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

  return (
    <Provider store={store}>
      <RenderStoreProvider value={lrs}>
        <IntlProvider locale={selectedLang} messages={messages}>
          <Router history={history}>
            <AppFrame />
          </Router>
        </IntlProvider>
      </RenderStoreProvider>
    </Provider>
  );
};

IndexContainer.propTypes = propTypes;

export default IndexContainer;

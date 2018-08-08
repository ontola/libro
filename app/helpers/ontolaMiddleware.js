import { memoizedNamespace } from 'link-lib';

import { safeCredentials } from './arguHelpers';

const ontolaMiddleware = (store) => {
// eslint-disable-next-line no-param-reassign
  store.namespaces.ontola = memoizedNamespace('https://ns.ontola.io/');

  return next => (iri, opts) => {
    if (iri === store.namespaces.ontola('actions/logout')) {
      return fetch(store.namespaces.app('logout').value, safeCredentials({
        method: 'POST',
      }))
        .then(() => {
          window.location.reload();
        }, () => {
          // TODO: bugsnag
        });
    }

    return next(iri, opts);
  };
};

export default ontolaMiddleware;

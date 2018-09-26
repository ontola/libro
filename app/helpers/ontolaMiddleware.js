import clipboardCopy from 'clipboard-copy';
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

    if (iri.value.startsWith(store.namespaces.ontola('actions/copyToClipboard').value)) {
      const value = new URL(iri.value).searchParams.get('value');

      return clipboardCopy(value)
        .then(() => Promise.resolve('Gekopieerd...'));
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/redirect').value)) {
      const value = new URL(iri.value).searchParams.get('location');

      window.location.href = value;
      return undefined;
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/toast').value)) {
      const value = new URL(iri.value).searchParams.get('text');

      return window.alert(value);
    }

    return next(iri, opts);
  };
};

export default ontolaMiddleware;

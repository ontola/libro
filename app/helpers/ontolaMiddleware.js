import clipboardCopy from 'clipboard-copy';
import { memoizedNamespace } from 'link-lib';
import {
  BlankNode,
  Collection,
  Literal,
  Statement,
} from 'rdflib';

import { safeCredentials } from './arguHelpers';

const ontolaMiddleware = (store) => {
  const ontola = memoizedNamespace('https://ns.ontola.io/');
  // eslint-disable-next-line no-param-reassign
  store.namespaces.ontola = ontola;

  const snackbarQueue = new Collection();

  // Set up snackbar
  store.processDelta([
    new Statement(
      ontola('snackbar/manager'),
      store.namespaces.rdf('type'),
      ontola('snackbar/Manager'),
      store.namespaces.ll('add')
    ),
    new Statement(
      ontola('snackbar/manager'),
      ontola('snackbar/queue'),
      snackbarQueue,
      store.namespaces.ll('add')
    ),
  ]);

  const queueSnackbar = (text) => {
    const s = new BlankNode();

    const queue = store.getResourceProperty(ontola('snackbar/manager'), ontola('snackbar/queue'));

    return [
      new Statement(
        s,
        store.namespaces.rdf('type'),
        ontola('snackbar/Snackbar'),
        store.namespaces.ll('add')
      ),
      new Statement(
        s,
        store.namespaces.schema('text'),
        Literal.fromValue(text),
        store.namespaces.ll('add')
      ),
      new Statement(
        ontola('snackbar/manager'),
        ontola('snackbar/queue'),
        Collection.fromValue([...queue.elements, s]),
        store.namespaces.ll('replace')
      ),
    ];
  };

  return next => (iri, opts) => {
    if (!iri.value.startsWith(store.namespaces.ontola('actions/').value)) {
      return next(iri, opts);
    }

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

      if (!value) {
        throw new Error('No redirect path was given in action');
      }

      window.location.href = value;
      return undefined;
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/snackbar').value)) {
      const value = new URL(iri.value).searchParams.get('text');

      return store.processDelta(queueSnackbar(value));
    }

    return next(iri, opts);
  };
};

export default ontolaMiddleware;

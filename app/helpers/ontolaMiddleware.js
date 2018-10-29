import clipboardCopy from 'clipboard-copy';
import { memoizedNamespace, namedNodeByIRI } from 'link-lib';
import {
  BlankNode,
  Collection,
  Literal,
  Statement,
} from 'rdflib';

import { safeCredentials } from './arguHelpers';
import { retrievePath } from './iris';

const ontolaMiddleware = history => (store) => {
  const ontola = memoizedNamespace('https://ns.ontola.io/');
  // eslint-disable-next-line no-param-reassign
  store.namespaces.ontola = ontola;

  const currentLocation = () => {
    const l = history.location;
    const caller = [
      [l.pathname, l.search].filter(Boolean).join('?'),
      l.hash,
    ].filter(Boolean).join('#');

    return store.namespaces.app(caller);
  };

  /**
   * Ontola snackbar setup
   */

  const snackbarQueue = new Collection();

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


  /**
   * Ontola dialog setup
   */

  const dialogManager = ontola('dialog/manager');

  store.processDelta([
    new Statement(
      dialogManager,
      store.namespaces.rdf('type'),
      ontola('dialog/Manager'),
      store.namespaces.ll('add')
    ),
  ]);

  const hideDialog = () => [
    new Statement(
      dialogManager,
      ontola('dialog/resource'),
      ontola('dialog/rm'),
      store.namespaces.ll('remove')
    ),
  ];

  const showDialog = value => [
    new Statement(
      dialogManager,
      ontola('dialog/resource'),
      namedNodeByIRI(value),
      store.namespaces.ll('replace')
    ),
    new Statement(
      dialogManager,
      ontola('dialog/opener'),
      currentLocation(),
      store.namespaces.ll('replace')
    ),
  ];

  history.listen((_location, action) => {
    if (['POP', 'PUSH'].includes(action)) {
      const dialog = store.getResourceProperty(dialogManager, ontola('dialog/resource'));
      if (dialog) {
        store.exec(ontola('actions/dialog/close'));
      }
    }
  });

  return next => (iri, opts) => {
    if (!iri.value.startsWith(store.namespaces.ontola('actions/').value)) {
      return next(iri, opts);
    }

    switch (iri) {
      case store.namespaces.ontola('actions/logout'):
        return fetch(store.namespaces.app('logout').value, safeCredentials({
          method: 'POST',
        }))
          .then(() => {
            window.location.reload();
          }, () => {
            // TODO: bugsnag
          });
      case store.namespaces.ontola('actions/refresh'):
        window.location.reload();
        return Promise.resolve();
      case store.namespaces.ontola('actions/reload'):
        window.location.reload(true);
        return Promise.resolve();
      default:
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/copyToClipboard').value)) {
      const value = new URL(iri.value).searchParams.get('value');

      return clipboardCopy(value)
        .then(() => Promise.resolve('Gekopieerd...'));
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/redirect').value)) {
      const value = new URL(iri.value).searchParams.get('location');
      const reload = new URL(iri.value).searchParams.get('reload');

      if (!value) {
        throw new Error('No redirect path was given in action');
      }

      const location = new URL(value, window.location.origin).toString();

      if (reload) {
        window.location.href = location;
      } else {
        // TODO: connect to router
        history.push(retrievePath(location));
      }
      return undefined;
    }

    if (iri === store.namespaces.ontola('actions/dialog/close')) {
      return store.processDelta(hideDialog());
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/dialog/alert').value)) {
      const resource = new URL(iri.value).searchParams.get('resource');

      history.push(currentLocation());
      return store.processDelta(showDialog(resource));
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/snackbar').value)) {
      const value = new URL(iri.value).searchParams.get('text');

      return store.processDelta(queueSnackbar(value));
    }

    return next(iri, opts);
  };
};

export default ontolaMiddleware;

import rdf, { createNS, Literal, NamedNode, Node } from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import { seqPush, seqShift } from '@rdfdev/collections';
import clipboardCopy from 'clipboard-copy';
import { History } from 'history';
import {
  MiddlewareActionHandler,
  MiddlewareFn,
  MiddlewareWithBoundLRS,
  transformers,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import React from 'react';
import { defineMessages } from 'react-intl';

import { safeCredentials } from '../helpers/arguHelpers';
import { retrievePath } from '../helpers/iris';
import { handle } from '../helpers/logging';
import ServiceWorkerCommunicator from '../helpers/ServiceWorkerCommunicator';
import ld from '../ontology/ld';
import { redirectPage, reloadPage } from './reloading';

const messages = defineMessages({
  copyFinished: {
    defaultMessage: 'Copied...',
    description: 'The (inline) message to indicate the value was copied to their clipboard',
    id: 'https://ns.ontola.io/actions/copyToClipboard/copySuccessMessage',
  },
});

const onDoneHandlers: { [key: string]: () => Promise<any> } = {};

const ontolaMiddleware = (history: History, serviceWorkerCommunicator: ServiceWorkerCommunicator):
    MiddlewareFn<React.ComponentType<any>> => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {

  (store as any).actions.ontola = {};

  const ontola = createNS('https://ns.ontola.io/');
  // eslint-disable-next-line no-param-reassign
  store.namespaces.ontola = ontola;

  const ontolaActionPrefix = store.namespaces.ontola('actions/').value;

  const currentPath = (): string => {
    const l = history.location;
    return [l.pathname, l.search, l.hash].filter(Boolean).join('');
  };

  /**
   * Websockets
   */

  const ontolaWebsocketsPrefix = store.namespaces.ontola('ws/').value;
  const deltaTransformer = transformers.linkedDeltaProcessor(store);

  /**
   * Ontola snackbar setup
   */

  const snackbarQueue = rdf.blankNode();

  store.processDelta([
    rdf.quad(
      ontola('snackbar/manager'),
      rdfx.type,
      ontola('snackbar/Manager'),
      ld.add,
    ),
    rdf.quad(
      ontola('snackbar/manager'),
      ontola('snackbar/queue'),
      snackbarQueue,
      ld.add,
    ),
    rdf.quad(
      snackbarQueue,
      rdfx.type,
      rdfx.Seq,
      ld.add,
    ),
  ], true);

  const queueSnackbar = (text: string) => {
    const s = rdf.blankNode();

    const queue = store.getResourceProperty<Node>(
      ontola('snackbar/manager'),
      ontola('snackbar/queue'),
    )!;

    return [
      rdf.quad(
        s,
        rdfx.type,
        ontola('snackbar/Snackbar'),
        ld.add,
      ),
      rdf.quad(
        s,
        schema.text,
        rdf.literal(text),
        ld.add,
      ),
      ...seqPush(store.store, queue, s),
    ];
  };

  const shiftSnackbar = () => {
    const queue = store.getResourceProperty<NamedNode>(
      ontola('snackbar/manager'),
      ontola('snackbar/queue'),
    )!;

    return seqShift(store.store, queue);
  };

  (store as any).actions.ontola.showSnackbar = (message: Literal | string) => {
    store.exec(store.namespaces.ontola(`actions/snackbar?text=${encodeURIComponent(message.toString())}`));
  };

  /**
   * Ontola dialog setup
   */

  const dialogManager = ontola('dialog/manager');

  store.processDelta([
    rdf.quad(
      dialogManager,
      store.namespaces.rdf('type'),
      ontola('dialog/Manager'),
      store.namespaces.ll('add'),
    ),
  ], true);

  const hideDialog = () => [
    rdf.quad(
      dialogManager,
      ontola('dialog/resource'),
      ontola('dialog/rm'),
      store.namespaces.ll('remove'),
    ),
  ];

  const showDialog = (value: string, opener?: string | null) => [
    rdf.quad(
      dialogManager,
      ontola('dialog/resource'),
      rdf.namedNode(value),
      store.namespaces.ll('replace'),
    ),
    rdf.quad(
      dialogManager,
      ontola('dialog/opener'),
      opener ? rdf.namedNode(opener) : store.namespaces.app(currentPath().slice(1)),
      store.namespaces.ll('replace'),
    ),
  ];

  (store as any).actions.ontola.showDialog = (resource: NamedNode, opener?: NamedNode) => {
    const resourceValue = encodeURIComponent(resource.value);
    const openerValue = opener ? encodeURIComponent(opener.value) : '';
    store.exec(store.namespaces.ontola(`actions/dialog/alert?resource=${resourceValue}&opener=${openerValue}`));
  };

  (store as any).actions.ontola.hideDialog = () => {
    store.exec(store.namespaces.ontola('actions/dialog/close'));
  };

  (store as any).actions.ontola.navigate = (resource: NamedNode) => {
    store.exec(store.namespaces.ontola(`actions/redirect?location=${encodeURIComponent(resource.value)}`));
  };

  /**
   * Miscellaneous
   */

  history.listen((opts, action) => {
    if (['POP', 'PUSH'].includes(action)) {
      store.exec(ontola(
          `actions/navigation/${action.toLowerCase()}`),
          {
            hash: opts.hash || '',
            key: opts.key || '',
            pathname: opts.pathname || '',
            search: opts.search || '',
            state: opts.state || '',
          },
        );
    }
  });

  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    const isWSAction = iri.value.startsWith(ontolaWebsocketsPrefix);

    if (!iri.value.startsWith(ontolaActionPrefix) && !isWSAction) {
      return next(iri, opts);
    }

    if (isWSAction) {
      if (iri.value.startsWith(`${ontolaWebsocketsPrefix}received`)) {
        return deltaTransformer(new Response(opts));
      }

      return Promise.resolve();
    }

    switch (rdf.id(iri)) {
      case rdf.id(store.namespaces.ontola('actions/refresh')):
        if (__CLIENT__) {
          reloadPage(store, false);
        }
        return Promise.resolve();
      case rdf.id(store.namespaces.ontola('actions/reload')):
        reloadPage(store, true);
        return Promise.resolve();
      case rdf.id(ontola(`actions/navigation/push`)):
      case rdf.id(ontola(`actions/navigation/pop`)):
        const dialog = store.getResourceProperty(dialogManager, ontola('dialog/resource'));
        const opener = store.getResourceProperty(dialogManager, ontola('dialog/opener'));
        if (dialog && (!opener || retrievePath(opener.value) !== currentPath())) {
          store.exec(ontola('actions/dialog/close'));
        }
        return next(iri, opts);
      default:
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/copyToClipboard').value)) {
      const value = new URL(iri.value).searchParams.get('value');

      if (!value) {
        throw new Error("Argument 'value' was missing.");
      }

      return clipboardCopy(value)
        .then(() => Promise.resolve((store as any).intl.formatMessage(messages.copyFinished)));
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/logout').value) ||
        iri.value.startsWith(store.namespaces.ontola('actions/expireSession').value)) {
      const location = new URL(iri.value).searchParams.get('location');

      return fetch(store.namespaces.app('logout').value, safeCredentials({
        method: 'POST',
      }))
        .then(() => {
          try {
            serviceWorkerCommunicator.clearCache();
          } catch (e) {
            handle(e);
          }
          if (location) {
            redirectPage(store, location);
          } else {
            reloadPage(store, false);
          }
        }, () => {
          handle(new Error('User logout action failed'));
        });
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/redirect').value)) {
      const value = new URL(iri.value).searchParams.get('location');
      const reload = new URL(iri.value).searchParams.get('reload');

      if (!value) {
        throw new Error('No redirect path was given in action');
      }

      const location = new URL(value, window.location.origin).toString();

      if (reload && __CLIENT__) {
        redirectPage(store, location);
      } else {
        // TODO: connect to router
        history.push(retrievePath(location));
      }
      return Promise.resolve();
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/dialog/close').value)) {
      const resource = new URL(iri.value).searchParams.get('resource');
      const dialog = store.getResourceProperty(dialogManager, ontola('dialog/resource'));

      if (!resource || (dialog && resource === dialog.value)) {
        store.processDelta(hideDialog(), true);
      }

      if (resource && opts && opts.done) {
        const onDone = onDoneHandlers[resource];

        if (onDone) {
          return onDone();
        }
      }
      return Promise.resolve();
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/dialog/alert').value)) {
      const resource = new URL(iri.value).searchParams.get('resource');
      const opener = new URL(iri.value).searchParams.get('opener');

      if (resource && opts && opts.onDone) {
        onDoneHandlers[resource] = opts.onDone;
      }

      history.push(currentPath());
      if (!resource) {
          throw new Error("Argument 'value' was missing.");
      }
      store.processDelta(showDialog(resource, opener), true);

      return Promise.resolve();
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/snackbar/finished').value)) {
      store.processDelta(shiftSnackbar(), true);
      return Promise.resolve();
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/snackbar').value)) {
      const value = new URL(iri.value).searchParams.get('text');
      if (!value) {
          throw new Error("Argument 'value' was missing.");
      }
      store.processDelta(queueSnackbar(value), true);

      return Promise.resolve();
    }

    return next(iri, opts);
  };
};

export default ontolaMiddleware;

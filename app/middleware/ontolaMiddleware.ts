import rdf, {
  Literal,
  NamedNode,
  Node,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { seqPush, seqShift } from '@rdfdev/collections';
import clipboardCopy from 'clipboard-copy';
import { History } from 'history';
import {
  MiddlewareActionHandler,
  MiddlewareFn,
  MiddlewareWithBoundLRS,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import React from 'react';
import { defineMessages } from 'react-intl';

import { safeCredentials } from '../helpers/arguHelpers';
import { retrievePath } from '../helpers/iris';
import { handle } from '../helpers/logging';
import ServiceWorkerCommunicator from '../helpers/ServiceWorkerCommunicator';
import hexjson from '../helpers/transformers/hexjson';
import app from '../ontology/app';
import ld from '../ontology/ld';
import libro from '../ontology/libro';
import ontola from '../ontology/ontola';

import { redirectPage, reloadPage } from './reloading';

const messages = defineMessages({
  copyFinished: {
    defaultMessage: 'Copied value to clipboard',
    description: 'The (inline) message to indicate the value was copied to their clipboard',
    id: 'https://ns.ontola.io/actions/copyToClipboard/copySuccessMessage',
  },
});

const onDoneHandlers: { [key: string]: () => Promise<any> } = {};

export const ontolaActionPrefix = libro.ns('actions/').value;
export const ontolaWebsocketsPrefix = ontola.ns('ws/').value;

const ontolaMiddleware = (history: History, serviceWorkerCommunicator: ServiceWorkerCommunicator):
    MiddlewareFn<React.ComponentType<any>> => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {

  (store as any).actions.ontola = {};

  const currentPath = (): string => {
    const l = history.location;

    return [l.pathname, l.search, l.hash].filter(Boolean).join('');
  };

  const deltaTransformer = hexjson.transformer(store);

  /**
   * Ontola snackbar setup
   */

  const snackbarQueue = rdf.blankNode();

  store.processDelta([
    rdf.quad(
      ontola.ns('snackbar/manager'),
      rdfx.type,
      ontola.ns('snackbar/Manager'),
      ld.add,
    ),
    rdf.quad(
      ontola.ns('snackbar/manager'),
      ontola.ns('snackbar/queue'),
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
      ontola.ns('snackbar/manager'),
      ontola.ns('snackbar/queue'),
    )!;

    return [
      rdf.quad(
        s,
        rdfx.type,
        ontola.ns('snackbar/Snackbar'),
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
      ontola.ns('snackbar/manager'),
      ontola.ns('snackbar/queue'),
    )!;

    return seqShift(store.store, queue);
  };

  (store as any).actions.ontola.showSnackbar = (message: Literal | string) => {
    return store.exec(rdf.namedNode(`${libro.actions.snackbar.show.value}?text=${encodeURIComponent(message.toString())}`));
  };

  /**
   * Ontola dialog setup
   */

  const dialogManager = ontola.ns('dialog/manager');

  store.processDelta([
    rdf.quad(
      dialogManager,
      rdfx.type,
      ontola.ns('dialog/Manager'),
      ld.add,
    ),
  ], true);

  const hideDialog = () => [
    rdf.quad(
      dialogManager,
      ontola.ns('dialog/resource'),
      ontola.ns('dialog/rm'),
      ld.remove,
    ),
  ];

  const showDialog = (value: string, opener?: string | null) => [
    rdf.quad(
      dialogManager,
      ontola.ns('dialog/resource'),
      rdf.namedNode(value),
      ld.replace,
    ),
    rdf.quad(
      dialogManager,
      ontola.ns('dialog/opener'),
      opener ? rdf.namedNode(opener) : app.ns(currentPath().slice(1)),
      ld.replace,
    ),
  ];

  (store as any).actions.ontola.showDialog = (resource: NamedNode, opener?: NamedNode) => {
    const resourceValue = encodeURIComponent(resource.value);
    const openerValue = opener ? encodeURIComponent(opener.value) : '';

    return store.exec(rdf.namedNode(`${libro.actions.dialog.alert.value}?resource=${resourceValue}&opener=${openerValue}`));
  };

  (store as any).actions.ontola.hideDialog = () => {
    return store.exec(libro.actions.dialog.close);
  };

  (store as any).actions.ontola.navigate = (resource: NamedNode, reload = false) => {
    let query = `location=${encodeURIComponent(resource.value)}`;
    if (reload) {
      query += '&reload=true';
    }

    return store.exec(rdf.namedNode(`${libro.actions.redirect.value}?&${query}`));
  };

  /**
   * Miscellaneous
   */

  history.listen((opts, action) => {
    if (['POP', 'PUSH'].includes(action)) {
      store.exec(libro.ns(`actions/navigations/${action.toLowerCase()}`),
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
      case rdf.id(libro.actions.refresh):
        if (__CLIENT__) {
          reloadPage(store, false);
        }

        return Promise.resolve();
      case rdf.id(libro.actions.reload):
        reloadPage(store, true);

        return Promise.resolve();
      case rdf.id(libro.actions.navigation.push):
      case rdf.id(libro.actions.navigation.pop): {
        const dialog = store.getResourceProperty(dialogManager, ontola.ns('dialog/resource'));
        const opener = store.getResourceProperty(dialogManager, ontola.ns('dialog/opener'));
        if (dialog && (!opener || retrievePath(opener.value) !== currentPath())) {
          store.exec(libro.actions.dialog.close);
        }

        return next(iri, opts);
      }
      default:
    }

    if (iri.value.startsWith(libro.actions.copyToClipboard.value)) {
      const value = new URL(iri.value).searchParams.get('value');

      if (!value) {
        throw new Error("Argument 'value' was missing.");
      }

      (store as any).actions.ontola.showSnackbar(
        (store as any).intl.formatMessage(messages.copyFinished),
      );

      return clipboardCopy(value);
    }

    if (iri.value.startsWith(libro.actions.logout.value) ||
        iri.value.startsWith(libro.actions.expireSession.value)) {
      const location = new URL(iri.value).searchParams.get('location');

      return fetch(app.ns('logout').value, safeCredentials({
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

    if (iri.value.startsWith(libro.actions.redirect.value)) {
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
        history.push(retrievePath(location) ?? '#');
      }

      return Promise.resolve();
    }

    if (iri.value.startsWith(libro.actions.dialog.close.value)) {
      const resource = new URL(iri.value).searchParams.get('resource');
      const dialog = store.getResourceProperty(dialogManager, ontola.ns('dialog/resource'));

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

    if (iri.value.startsWith(libro.actions.dialog.alert.value)) {
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

    if (iri.value.startsWith(libro.actions.snackbar.finished.value)) {
      store.processDelta(shiftSnackbar(), true);

      return Promise.resolve();
    }

    if (iri.value.startsWith(libro.actions.snackbar.show.value)) {
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

import rdf, {
  Literal,
  NamedNode,
  Node,
  Quadruple,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import clipboardCopy from 'clipboard-copy';
import type { History } from 'history';
import {
  MiddlewareActionHandler,
  MiddlewareFn,
  MiddlewareWithBoundLRS,
  SerializableDataTypes,
  SomeNode,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import React from 'react';

import { safeCredentials } from '../helpers/dom';
import { retrievePath } from '../helpers/iris';
import { handle } from '../helpers/logging';
import { quadruple } from '../helpers/quadruple';
import ServiceWorkerCommunicator from '../helpers/ServiceWorkerCommunicator';
import hexjson from '../helpers/transformers/hexjson';
import app from '../ontology/app';
import ld from '../ontology/ld';
import libro from '../ontology/libro';
import ontola from '../ontology/ontola';
import { actionMessages } from '../translations/messages';

import { redirectPage, reloadPage } from './reloading';

const onDoneHandlers: { [key: string]: () => Promise<any> } = {};

export const ontolaActionPrefix = libro.ns('actions/').value;
export const ontolaWebsocketsPrefix = ontola.ns('ws/').value;
export enum DialogSize {
  Xs = 'xs',
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl',
}

export const isDialogSize = (size?: string | null): size is DialogSize => ['xs', 'sm', 'md', 'lg', 'xl', false].includes(size ?? '');

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
    [
      libro.ns('snackbar/manager'),
      rdfx.type,
      libro.ns('snackbar/Manager'),
      ld.add,
    ],
    [
      libro.ns('snackbar/manager'),
      libro.ns('snackbar/queue'),
      snackbarQueue,
      ld.add,
    ],
    [
      libro.ns('snackbar/manager'),
      libro.ns('snackbar/number'),
      rdf.literal(0),
      ld.add,
    ],
    [
      libro.ns('snackbar/manager'),
      libro.ns('snackbar/current'),
      rdf.literal(0),
      ld.add,
    ],
    [
      snackbarQueue,
      rdfx.type,
      rdfx.Seq,
      ld.add,
    ],
  ], true);

  const queueSnackbar = (text: string): Quadruple[] => {
    const s = rdf.blankNode();

    const snackNumber = store.getResourceProperty<Node>(
      libro.ns('snackbar/manager'),
      libro.ns('snackbar/number'),
    )!;
    store.store.getInternalStore().store.setField(
      libro.ns('snackbar/manager').value,
      libro.ns('snackbar/number').value,
      rdf.literal(Number(snackNumber.value) + 1),
    );
    const queueId = store.getResourceProperty<Node>(
      libro.ns('snackbar/manager'),
      libro.ns('snackbar/queue'),
    )!;

    return [
      [
        s,
        rdfx.type,
        libro.ns('snackbar/Snackbar'),
        ld.add,
      ],
      [
        s,
        schema.text,
        rdf.literal(text),
        ld.add,
      ],
      [
        queueId,
        rdfx.ns(`_${snackNumber.value}`),
        s,
        ld.add,
      ],
    ];
  };

  (store as any).actions.ontola.showSnackbar = (message: Literal | string) =>
    store.exec(rdf.namedNode(`${libro.actions.snackbar.show.value}?text=${encodeURIComponent(message.toString())}`));

  /**
   * Ontola dialog setup
   */

  const dialogManager = libro.ns('dialog/manager');

  store.processDelta([
    quadruple(
      dialogManager,
      rdfx.type,
      libro.ns('dialog/Manager'),
      ld.add,
    ),
  ], true);

  const hideDialog = () => [
    quadruple(
      dialogManager,
      libro.ns('dialog/resource'),
      libro.ns('dialog/closed'),
      ld.replace,
    ),
  ];

  const showDialog = (value: string, size?: DialogSize | null) => [
    quadruple(
      dialogManager,
      libro.ns('dialog/resource'),
      rdf.namedNode(value),
      ld.replace,
    ),
    quadruple(
      dialogManager,
      libro.ns('dialog/size'),
      rdf.literal(size || DialogSize.Lg),
      ld.replace,
    ),
  ];

  (store as any).actions.ontola.showDialog = (resource: NamedNode, size?: string | null) => {
    const resourceValue = encodeURIComponent(resource.value);
    const sizeValue = size ? encodeURIComponent(size) : '';

    return store.exec(rdf.namedNode(`${libro.actions.dialog.alert.value}?resource=${resourceValue}&size=${sizeValue}`));
  };

  (store as any).actions.ontola.hideDialog = (resource?: NamedNode, done?: boolean) => {
    const query = resource ? `?resource=${encodeURIComponent(resource.value)}` : undefined;
    const opts = done ? { done } : undefined;

    store.exec(
      rdf.namedNode(`${libro.actions.dialog.close.value}${query}`),
      opts,
    );
  };

  (store as any).actions.ontola.navigate = (resource: NamedNode, reload = false) => {
    let query = `location=${encodeURIComponent(resource.value)}`;

    if (reload) {
      query += '&reload=true';
    }

    return store.exec(rdf.namedNode(`${libro.actions.redirect.value}?&${query}`));
  };

  (store as any).actions.ontola.openWindow = (url: string) => {
    const query = `url=${encodeURIComponent(url)}`;

    return store.exec(rdf.namedNode(`${libro.actions.window.open.value}?${query}`));
  };

  (store as any).actions.ontola.playAudio = (resource: NamedNode) =>
    store.exec(rdf.namedNode(`${libro.actions.playAudio.value}?resource=${encodeURIComponent(resource.value)}`));

  /**
   * Miscellaneous
   */

  const closeOldDialogs = () => {
    const dialog = store.getResourceProperty(dialogManager, libro.ns('dialog/resource'));

    if (dialog) {
      store.exec(libro.actions.dialog.close);
    }
  };

  history.listen(({ location, action }) => {
    if (['POP', 'PUSH'].includes(action)) {
      store.exec(libro.ns(`actions/navigations/${action.toLowerCase()}`),
        {
          hash: location.hash || '',
          key: location.key || '',
          pathname: location.pathname || '',
          search: location.search || '',
          state: location.state as SerializableDataTypes || '',
        },
      );
    }
  });

  return (next: MiddlewareActionHandler) => (iri: SomeNode, opts: any): Promise<any> => {
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
        reloadPage(store);
      }

      return Promise.resolve();
    case rdf.id(libro.actions.reload):
      reloadPage(store);

      return Promise.resolve();

    case rdf.id(libro.actions.navigation.push): {
      return next(iri, opts);
    }

    case rdf.id(libro.actions.navigation.pop): {
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
        (store as any).intl.formatMessage(actionMessages.copyFinished),
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
            reloadPage(store);
          }
        }, () => {
          handle(new Error('User logout action failed'));
        });
    }

    if (iri.value.startsWith(libro.actions.redirect.value)) {
      const value = new URL(iri.value).searchParams.get('location');
      const reload = new URL(iri.value).searchParams.get('reload');

      closeOldDialogs();

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
      store.processDelta(hideDialog(), true);

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
      const size = new URL(iri.value).searchParams.get('size');

      if (resource && opts && opts.onDone) {
        onDoneHandlers[resource] = opts.onDone;
      }

      const dialog = store.getResourceProperty(dialogManager, libro.ns('dialog/resource'));

      if (!dialog || dialog === libro.ns('dialog/closed')) {
        history.push(currentPath());
      }

      if (!resource) {
        throw new Error("Argument 'value' was missing.");
      }

      store.processDelta(showDialog(resource, isDialogSize(size) ? size : undefined), true);

      return Promise.resolve();
    }

    if (iri.value.startsWith(libro.actions.snackbar.finished.value)) {
      const current = store.getResourceProperty<NamedNode>(
        libro.ns('snackbar/manager'),
        libro.ns('snackbar/current'),
      )!;

      store.processDelta([
        [
          libro.ns('snackbar/manager'),
          libro.ns('snackbar/current'),
          rdf.literal(Number(current.value) + 1),
          ld.replace,
        ],
      ]);

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

    if (iri.value.startsWith(libro.actions.window.open.value)) {
      const url = new URL(iri.value).searchParams.get('url');

      if (!url) {
        throw new Error("Argument 'url' was missing.");
      }

      window.open(url);

      return Promise.resolve();
    }

    if (iri.value.startsWith(libro.actions.playAudio.value)) {
      const resource = new URL(iri.value).searchParams.get('resource');

      if (!resource) {
        throw new Error("Argument 'resource' was missing.");
      }

      const audio = new Audio(resource);

      return audio.play();
    }

    return next(iri, opts);
  };
};

export default ontolaMiddleware;

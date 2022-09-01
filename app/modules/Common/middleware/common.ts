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

import ServiceWorkerCommunicator from '../../../components/ServiceWorkerCommunicator';
import { handle } from '../../../helpers/logging';
import hexjson from '../../../helpers/transformers/hexjson';
import ld from '../../../modules/Kernel/ontology/ld';
import libro from '../../../modules/Kernel/ontology/libro';
import { actionMessages } from '../../../translations/messages';
import { quadruple } from '../../Kernel/lib/quadruple';
import { DialogSize, isDialogSize } from '../lib/DialogSize';
import { safeCredentials } from '../lib/dom';
import { retrievePath } from '../lib/iris';
import app from '../ontology/app';

import {
  CopyToClipboard,
  HideDialog,
  Navigate,
  OpenWindow,
  PlayAudio,
  PlayBeep,
  ShowDialog,
  ShowSnackbar,
} from './actions';
import { redirectPage, reloadPage } from './reloading';

const onDoneHandlers: { [key: string]: () => Promise<any> } = {};

export const libroActionPrefix = libro.ns('actions/').value;
export const libroWebsocketsPrefix = libro.ns('ws/').value;

const A = 440;
const DUAL = 2;
const SHORT = .2;

export const beep = (
  time = SHORT,
  frequency = A,
  steps = DUAL,
  type: OscillatorType = 'square',
): void => {
  // create web audio api context
  const audioCtx = new AudioContext();

  // create Oscillator node
  const oscillator = audioCtx.createOscillator();
  oscillator.connect(audioCtx.destination);
  oscillator.type = type;

  for (let i = 0; i <= steps; i++) {
    oscillator.frequency.setValueAtTime(
      frequency * (i + 1),
      audioCtx.currentTime + (time / steps) * i,
    );
  }

  oscillator.start(0);
  oscillator.stop(audioCtx.currentTime + time);
};

const commonMiddleware = (history: History, serviceWorkerCommunicator: ServiceWorkerCommunicator):
  MiddlewareFn<React.ComponentType<any>> => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {

  const innerStore = store.store.getInternalStore().store;

  const currentPath = (): string => {
    const l = history.location;

    return [l.pathname, l.search, l.hash].filter(Boolean).join('');
  };

  const deltaTransformer = hexjson.transformer(store);

  /**
   * Libro snackbar setup
   */

  const snackbarQueue = rdf.blankNode();

  innerStore.setRecord(libro.ns('snackbar/manager').value, {
    [rdfx.type.value]: libro.ns('snackbar/Manager'),
    [libro.ns('snackbar/queue').value]: snackbarQueue,
    [libro.ns('snackbar/number').value]: rdf.literal(0),
    [libro.ns('snackbar/current').value]: rdf.literal(0),
  });
  innerStore.setField(snackbarQueue.value, rdfx.type.value, rdfx.Seq);

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

  store.actions.set(
    ShowSnackbar,
    (message: Literal | string) => store.exec(rdf.namedNode(`${libro.actions.snackbar.show.value}?text=${encodeURIComponent(message.toString())}`)),
  );

  /**
   * Libro dialog setup
   */

  const dialogManager = libro.ns('dialog/manager');

  innerStore.setRecord(dialogManager.value, {
    [rdfx.type.value]: libro.ns('dialog/Manager'),
  });

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

  store.actions.set(
    ShowDialog,
    (resource: SomeNode, size?: string | null) => {
      const resourceValue = encodeURIComponent(resource.value);
      const sizeValue = size ? encodeURIComponent(size) : '';

      return store.exec(rdf.namedNode(`${libro.actions.dialog.alert.value}?resource=${resourceValue}&size=${sizeValue}`));
    },
  );

  store.actions.set(
    HideDialog,
    (resource?: NamedNode, done?: boolean) => {
      const query = resource ? `?resource=${encodeURIComponent(resource.value)}` : undefined;
      const opts = done ? { done } : undefined;

      store.exec(
        rdf.namedNode(`${libro.actions.dialog.close.value}${query}`),
        opts,
      );
    },
  );

  store.actions.set(
    Navigate,
    (resource: NamedNode, reload = false) => {
      let query = `location=${encodeURIComponent(resource.value)}`;

      if (reload) {
        query += '&reload=true';
      }

      return store.exec(rdf.namedNode(`${libro.actions.redirect.value}?&${query}`));
    },
  );

  store.actions.set(
    OpenWindow,
    (url: string) => {
      const query = `url=${encodeURIComponent(url)}`;

      return store.exec(rdf.namedNode(`${libro.actions.window.open.value}?${query}`));
    },
  );

  store.actions.set(
    CopyToClipboard,
    (value: string) => store.exec(rdf.namedNode(`${libro.actions.copyToClipboard.value}?value=${encodeURIComponent(value)}`)),
  );

  store.actions.set(
    PlayAudio,
    (resource: NamedNode) => store.exec(rdf.namedNode(`${libro.actions.playAudio.value}?resource=${encodeURIComponent(resource.value)}`)),
  );

  store.actions.set(
    PlayBeep,
    (opts: { time?: number, steps?: number, frequency?: number } = {}) => {
      const params = new URLSearchParams();
      Object.entries(opts).forEach(([k, v]) => params.set(k, v.toString()));

      return store.exec(rdf.namedNode(`${libro.actions.playBeep.value}?${params.toString()}`));
    },
  );

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
    const isWSAction = iri.value.startsWith(libroWebsocketsPrefix);

    if (!iri.value.startsWith(libroActionPrefix) && !isWSAction) {
      return next(iri, opts);
    }

    if (isWSAction) {
      if (iri.value.startsWith(`${libroWebsocketsPrefix}received`)) {
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

      store.actions.get(ShowSnackbar)(
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

    if (iri.value.startsWith(libro.actions.playBeep.value)) {
      const time = new URL(iri.value).searchParams.get('time');
      const frequency = new URL(iri.value).searchParams.get('frequency');
      const steps = new URL(iri.value).searchParams.get('steps');

      beep(
        Number(time ?? SHORT),
        Number(frequency ?? A),
        Number(steps ?? DUAL),
      );

      return Promise.resolve();
    }

    return next(iri, opts);
  };
};

export default commonMiddleware;

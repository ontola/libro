// eslint-disable-next-line import/no-extraneous-dependencies
import {
  History,
  createBrowserHistory,
  createMemoryHistory,
} from 'history';
import {
  DataRecord,
  LinkedRenderStoreOptions,
  MiddlewareFn,
  createStore,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import type React from 'react';

import ServiceWorkerCommunicator from '../components/ServiceWorkerCommunicator';
import { FRONTEND_ACCEPT } from '../config';
import analyticsMiddleware from '../middleware/analyticsMiddleware';
import { appMiddleware } from '../middleware/app';
import type { Module } from '../Module';
import execFilter from '../modules/Kernel/middleware/execFilter';
import logging from '../modules/Kernel/middleware/logging';
import { searchMiddleware } from '../middleware/searchMiddleware';
import commonMiddleware from '../modules/Common/middleware/common';
import ontolaDeltaProcessor from '../modules/Kernel/lib/ontolaDeltaProcessor';
import { WebManifest } from '../modules/Kernel/components/AppContext/WebManifest';
import { website } from '../modules/Kernel/lib/frontendIRIComponents';
import { modulesKey, topologiesKey } from '../modules/Kernel/lib/settings';
import transformers from '../modules/Kernel/lib/transformers';
import { allTopologies } from '../topologies';

import { execActionByIRI } from './execActionByIRI';
import { handle } from './logging';
import empndjson from './transformers/empndjson';
import hexjson from './transformers/hexjson';

export interface LRSBundle {
  history: History;
  lrs: LinkReduxLRSType;
  serviceWorkerCommunicator: ServiceWorkerCommunicator;
}

export interface GenerateLRSOpts {
  middleware?: boolean;
}

const defaultOpts = {
  middleware: __CLIENT__,
};

const history = __CLIENT__ && !__TEST__
  ? createBrowserHistory()
  : createMemoryHistory();

export default async function generateLRS(
  manifest: WebManifest,
  modules: Module[],
  initialData: Record<string, DataRecord> = {},
  mapping: Record<string, string>,
  options: GenerateLRSOpts = defaultOpts,
): Promise<LRSBundle> {
  const serviceWorkerCommunicator = new ServiceWorkerCommunicator();

  const middleware: Array<MiddlewareFn<any>> = options.middleware ? [
    logging,
    commonMiddleware(history, serviceWorkerCommunicator),
    analyticsMiddleware(),
    appMiddleware(),
    searchMiddleware(),
    execFilter(manifest.ontola.website_iri),
  ] : [];
  const storeOptions: LinkedRenderStoreOptions<React.ComponentType> = {
    data: initialData,
    report: handle,
  };

  if (!__CLIENT__) {
    storeOptions.apiOpts = { bulkEndpoint: 'http://localhost/link-lib/bulk' };
  }

  const lrs = createStore<React.ComponentType>(storeOptions, middleware);
  serviceWorkerCommunicator.linkedRenderStore = lrs;
  lrs.bulkFetch = true;
  lrs.settings.set(modulesKey, modules);
  lrs.settings.set(topologiesKey, allTopologies);

  lrs.deltaProcessors.unshift(ontolaDeltaProcessor(lrs));

  lrs.api.registerTransformer(empndjson.transformer(lrs, manifest.ontola.website_iri, mapping), empndjson.mediaTypes, empndjson.acceptValue);
  lrs.api.registerTransformer(hexjson.transformer(lrs), hexjson.mediaTypes, hexjson.acceptValue);
  transformers(lrs).forEach((t) =>
    lrs.api.registerTransformer(t.transformer, t.mediaTypes, t.acceptValue),
  );

  if (!website) {
    handle(new Error('No website in head'));
  }

  (lrs as any).execActionByIRI = execActionByIRI(lrs);

  // @ts-ignore TS2341
  lrs.api.accept.default = FRONTEND_ACCEPT;

  // Globally disable anti-jump rendering
  (lrs as any).broadcast_old = (lrs as any).broadcast;
  (lrs as any).broadcast = (_: boolean, __: number) => (lrs as any).broadcast_old(false, 0);

  lrs.store.addQuadruples(modules.flatMap((it) => it.seed).filter(Boolean));

  for (const module of modules) {
    if (module.initialize !== undefined) {
      module.initialize(lrs, options);
    }
  }

  return {
    history,
    lrs,
    serviceWorkerCommunicator,
  };
}

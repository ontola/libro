import { Node } from '@ontologies/core';
import type { History } from 'history';
import LinkedRenderStore from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import { Store, createStore } from 'redux';

import ServiceWorkerCommunicator from '../../app/components/ServiceWorkerCommunicator';

export interface TestContextOpts {
  history?: History | boolean;
  serviceWorkerCommunicator?: ServiceWorkerCommunicator | boolean;
  store?: Store | boolean;
  subject?: Node | boolean;
  lrs?: LinkReduxLRSType | boolean;
}

export interface TestContext {
  history?: History;
  serviceWorkerCommunicator?: ServiceWorkerCommunicator;
  store: Store;
  subject?: Node;
  lrs: LinkReduxLRSType;
}

export const generateStore = (): Store => createStore(
  (state) => state,
  {},
);

export function defaultContext(properties: TestContextOpts = {}): TestContext {
  const keys = Object.keys(properties) as Array<keyof TestContextOpts> & Array<keyof TestContext>;
  const c: Partial<TestContext> = {};
  const defaults: TestContext = {
    lrs: new LinkedRenderStore(),
    store: generateStore(),
  };
  keys.forEach((key) => {
    if (properties[key] === true) {
      c[key] = defaults[key] as any;
    } else if (properties[key] !== undefined) {
      c[key] = properties[key] as any;
    }
  });

  return c as TestContext;
}

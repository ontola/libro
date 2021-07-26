import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { History, createMemoryHistory } from 'history';
import LinkedRenderStore, { SomeNode } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import { Store, createStore } from 'redux';

import ServiceWorkerCommunicator from '../ServiceWorkerCommunicator';

Enzyme.configure({ adapter: new Adapter() });

type DefaultableObject<T> = {
  [P in keyof T]: T[P] | true;
};

export interface TestContext {
  history: History<any>;
  lrs: LinkReduxLRSType;
  store: Store;
  serviceWorkerCommunicator?: ServiceWorkerCommunicator;
  subject?: SomeNode | undefined;
}

export type DefaultableRenderOpts = Partial<DefaultableObject<TestContext>>;

export const generateStore = (): Store => createStore(
  (state) => state,
  {},
);

export function defaultContext(properties: DefaultableRenderOpts = {}): TestContext {
  const keys = Object.keys(properties) as Array<keyof TestContext>;
  const c: Partial<TestContext> = {};
  const defaults: TestContext = {
    history: createMemoryHistory() as History<unknown>,
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

import rdf, {
  LowLevelStore,
  Quad,
  SomeTerm,
  createNS,
} from '@ontologies/core';
import { History } from 'history';
import { SomeNode } from 'link-lib';
import BasicStore from 'link-lib/dist-types/store/BasicStore';
import { LinkReduxLRSType } from 'link-redux';
import { Store } from 'redux';

import generateLRS from '../generateLRS';
import ServiceWorkerCommunicator from '../ServiceWorkerCommunicator';

import { TestContext, defaultContext } from './utilities';

const exNS = createNS('http://example.org/');

const context = (
  iri: SomeNode | undefined,
  lrs: LinkReduxLRSType,
  store: Store | undefined,
  history: History,
  serviceWorkerCommunicator: ServiceWorkerCommunicator,
): TestContext => defaultContext({
  history,
  lrs: lrs || true,
  serviceWorkerCommunicator,
  store: store || true,
  subject: iri,
});

async function chargeLRS(id: string, obj: Quad[], store: Store | undefined = undefined): Promise<TestContext> {
  const {
    lrs,
    history,
    serviceWorkerCommunicator,
  } = generateLRS();
  await lrs.processDelta(obj, true);
  lrs.store.flush();

  return context(id ? exNS(id) : undefined, lrs, store, history, serviceWorkerCommunicator);
}

function getSubject(obj: TestObject, subject: string | null): string {
  const keys = obj && Object.keys(obj);

  return subject ?? keys.pop()!;
}

function isBasicStore(obj: any): obj is BasicStore {
  return obj && Object.prototype.hasOwnProperty.call(obj, 'quads');
}

interface TestObject {
  [k: string]: {
    [k: string]: SomeTerm | SomeTerm[]
  }
}

export function toArr(obj: undefined | BasicStore | TestObject): Quad[] {
  if (typeof obj === 'undefined') {
    return [];
  }

  if (isBasicStore(obj)) {
    return obj.quads;
  }

  const statements: Quad[] = [];
  Object.keys(obj).forEach((s) => {
    const resource = obj[s];
    const subject = s.startsWith('_:')
      ? rdf.blankNode(s.slice('_:'.length))
      : rdf.namedNode(s.slice(1, -1));
    Object.keys(resource).forEach((p) => {
      const object = resource[p];
      const predicate = rdf.namedNode(p.slice(1, -1));

      if (Array.isArray(object)) {
        object.forEach((iObject) => statements.push(rdf.quad(subject, predicate, iObject)));
      } else {
        statements.push(rdf.quad(subject, predicate, object));
      }
    });
  });

  return statements;
}

export const generateCtx = (obj: LowLevelStore, subject: string | null = null): Promise<TestContext> => chargeLRS(
  getSubject(obj, subject),
  toArr(obj),
);

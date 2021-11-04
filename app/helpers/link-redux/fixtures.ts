import rdf, {
  Node,
  Quad,
  createNS,
} from '@ontologies/core';
import { History } from 'history';
import { DataObject } from 'link-lib';
import RDFIndex from 'link-lib/dist-types/store/RDFIndex';
import { LinkReduxLRSType } from 'link-redux';
import { Store } from 'redux';

import { defaultManifest } from '../defaultManifest';
import generateLRS from '../generateLRS';
import ServiceWorkerCommunicator from '../ServiceWorkerCommunicator';

import { TestContext, defaultContext } from './utilities';

const exNS = createNS('http://example.org/');

const context = (
  iri: Node | undefined,
  lrs: LinkReduxLRSType | undefined,
  store: Store | undefined,
  history: History,
  serviceWorkerCommunicator: ServiceWorkerCommunicator,
): TestContext => defaultContext({
  history,
  lrs: lrs || true,
  // ns: lrs.namespaces
  serviceWorkerCommunicator,
  store: store || true,
  subject: iri,
});

async function chargeLRS(id: Node | string, obj: Quad[], store: Store | undefined = undefined): Promise<TestContext> {
  const testManifest = defaultManifest('https://app.argu.co/freetown');

  const {
    lrs,
    history,
    serviceWorkerCommunicator,
  } = await generateLRS(testManifest);
  await lrs.processDelta(obj, true);
  lrs.store.flush();

  return context(typeof id === 'string' ? exNS(id) : id, lrs, store, history, serviceWorkerCommunicator);
}

function getSubject(obj: any, subject: string | Node | null): Node | string {
  const keys = obj && Object.keys(obj);

  return subject || keys?.pop();
}

const isRDFIndex = (v: unknown): v is RDFIndex => Object.prototype.hasOwnProperty.call(v, 'quads');

export function toArr(obj: undefined | RDFIndex | Record<string, DataObject>): Quad[] {
  if (typeof obj === 'undefined') {
    return [];
  }

  if (isRDFIndex(obj)) {
    return obj.quads as Quad[];
  }

  const statements: Quad[] = [];
  Object.keys(obj).forEach((s) => {
    const resource = (obj)[s];
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

export const generateCtx = (
  obj: RDFIndex | Record<string, DataObject>,
  subject: string | Node | null | undefined = null,
): Promise<TestContext> => chargeLRS(
  getSubject(obj, subject),
  toArr(obj),
);

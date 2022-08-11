import rdf, {
  Node,
  Quadruple,
  SomeTerm,
  createNS,
} from '@ontologies/core';
import type { History } from 'history';
import { DataObject, RDFIndex } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import { Store } from 'redux';

import { defaultManifest } from '../../app/helpers/defaultManifest';
import generateLRS from '../../app/helpers/generateLRS';
import { Module } from '../../app/Module';
import { quadruple } from '../../app/modules/Kernel/lib/quadruple';
import ServiceWorkerCommunicator from '../../app/components/ServiceWorkerCommunicator';

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

async function chargeLRS(
  modules: Module[],
  id: Node | string,
  obj: Quadruple[],
  store: Store | undefined = undefined,
): Promise<TestContext> {
  const testManifest = defaultManifest('https://app.argu.co/freetown');

  const {
    lrs,
    history,
    serviceWorkerCommunicator,
  } = await generateLRS(testManifest, modules, {}, {});
  await lrs.processDelta(obj, true);
  lrs.store.flush();

  return context(typeof id === 'string' ? exNS(id) : id, lrs, store, history, serviceWorkerCommunicator);
}

function getSubject(obj: any, subject: string | Node | null): Node | string {
  const keys = obj && Object.keys(obj);

  return subject || keys?.pop();
}

const isRDFIndex = (v: unknown): v is RDFIndex => Array.isArray((v as RDFIndex).quads);

export function toArr(obj: undefined | RDFIndex | Record<string, DataObject>): Quadruple[] {
  if (typeof obj === 'undefined') {
    return [];
  }

  if (isRDFIndex(obj)) {
    return obj.quads;
  }

  const statements: Quadruple[] = [];
  Object.keys(obj).forEach((s) => {
    const resource = (obj)[s];
    const subject = s.startsWith('_:')
      ? rdf.blankNode(s)
      : rdf.namedNode(s.slice(1, -1));
    Object.keys(resource).forEach((p) => {
      const object = resource[p];
      const predicate = rdf.namedNode(p.slice(1, -1));

      if (Array.isArray(object)) {
        object.forEach((iObject) => statements.push(quadruple(subject, predicate, iObject as SomeTerm)));
      } else {
        statements.push(quadruple(subject, predicate, object as SomeTerm));
      }
    });
  });

  return statements;
}

export const generateCtx = (
  modules: Module[],
  obj: RDFIndex | Record<string, DataObject>,
  subject: string | Node | null | undefined = null,
): Promise<TestContext> => chargeLRS(
  modules,
  getSubject(obj, subject),
  toArr(obj),
);

import rdf, { createNS } from '@ontologies/core';

import generateLRS from '../generateLRS';

import { defaultContext } from './utilities';

const exNS = createNS('http://example.org/');

const context = (iri, lrs, store, history, serviceWorkerCommunicator) => defaultContext({
  history,
  lrs: lrs || true,
  ns: lrs.namespaces,
  serviceWorkerCommunicator,
  store: store || true,
  subject: iri,
});

async function chargeLRS(id, obj, store) {
  const {
    lrs,
    history,
    serviceWorkerCommunicator,
  } = generateLRS();
  await lrs.processDelta(obj, true);
  lrs.store.flush();

  return context(id ? exNS(id) : undefined, lrs, store, history, serviceWorkerCommunicator);
}

function getSubject(obj, subject) {
  const keys = obj && Object.keys(obj);

  return subject || keys?.pop();
}

export function toArr(obj) {
  if (typeof obj === 'undefined') {
    return [];
  }
  if (Object.prototype.hasOwnProperty.call(obj, 'quads')) {
    return obj.quads;
  }
  const statements = [];
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

export const generateCtx = (obj, subject = null) => chargeLRS(
  getSubject(obj, subject),
  toArr(obj)
);

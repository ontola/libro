import rdf, { createNS } from '@ontologies/core';

import generateLRS from '../generateLRS';

import { defaultContext } from './utilities';

const exNS = createNS('http://example.org/');

const context = (iri, lrs, store) => defaultContext({
  lrs: lrs || true,
  ns: lrs.namespaces,
  store: store || true,
  subject: iri,
});

function chargeLRS(id, obj, store) {
  const { LRS } = generateLRS();
  LRS.store.addQuads(obj);
  LRS.store.flush();

  return context(id ? exNS(id) : undefined, LRS, store);
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
        object.forEach(iObject => statements.push(rdf.quad(subject, predicate, iObject)));
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

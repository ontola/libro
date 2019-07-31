import rdf from 'rdflib';

import generateLRS from '../generateLRS';

import { defaultContext } from './utilities';

const exNS = rdf.Namespace('http://example.org/');

const context = (iri, lrs, store) => defaultContext({
  lrs: lrs || true,
  ns: lrs.namespaces,
  store: store || true,
  subject: iri,
});

function chargeLRS(id, obj, store) {
  const { LRS } = generateLRS();
  LRS.store.addStatements(obj);
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
  if (obj instanceof rdf.IndexedFormula) {
    return obj.statements;
  }
  const statements = [];
  Object.keys(obj).forEach((s) => {
    const resource = obj[s];
    const subject = s.startsWith('_:')
      ? new rdf.BlankNode(s.slice('_:'.length))
      : new rdf.NamedNode(s.slice(1, -1));
    Object.keys(resource).forEach((p) => {
      const object = resource[p];
      const predicate = new rdf.NamedNode(p.slice(1, -1));
      if (Array.isArray(object)) {
        object.forEach(iObject => statements.push(new rdf.Statement(subject, predicate, iObject)));
      } else {
        statements.push(new rdf.Statement(subject, predicate, object));
      }
    });
  });

  return statements;
}

export const generateCtx = (obj, subject = null) => chargeLRS(
  getSubject(obj, subject),
  toArr(obj)
);

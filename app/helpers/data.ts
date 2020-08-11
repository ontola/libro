import as from '@ontologies/as';
import rdf, {isBlankNode, isLiteral, Literal, NamedNode, Node, Quad, SomeTerm} from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import { BAD_REQUEST, OK } from 'http-status-codes';
import { LazyNNArgument, normalizeType } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import ontola from '../ontology/ontola';

import { sequenceFilter } from './iris';

const base = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_';

function filterFind(op: Node) {
  return (bV: Node | RegExp) => {
    if (bV instanceof RegExp) {
      return bV.test(op.value);
    } else if (Object.prototype.hasOwnProperty.call(bV, 'termType')) {
      return bV.value === op.value && bV.termType === op.termType;
    }

    throw new Error('Match on regex or IRI');
  };
}

function arraysEqual(a: any[], b: any[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function bestType(type: LazyNNArgument) {
  const normalizedTypes = normalizeType(type);
  let best = null;

  for (const normalizedType of normalizedTypes) {
    switch (normalizedType.value.split('#').pop()) {
      case 'Resource':
      case 'Document':
      case 'RDFDocument':
        if (!best) {
          best = normalizedType;
        }
        break;
      default:
        best = normalizedType;
        break;
    }
  }

  return best;
}

function compare(a: object | number, b: object | number) {
  if (a < b) { return -1; }
  if (a > b) { return 1; }

  return 0;
}

function dataURItoBlob(literal: Literal): File {
  const dataURI = literal.value;
  const filename = literal.datatype.value.split('filename=').pop();
  const [preamble, data] = dataURI.split(',');
  const byteString = atob(data);
  const ia = new Uint8Array(new ArrayBuffer(byteString.length));

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const options = {
    encoding: 'UTF-8',
    type: preamble.split(':').pop()!.split(';').shift(),
  };
  const b = new Blob([ia], options);

  return new File([b], filename || '', options);
}

function convertKeysAtoB(obj: { [k: string]: any }, aToB = true): { [k: string]: any } {
  const output: { [k: string]: any } = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (k === '@id') {
      output[k] = v;
    } else {
      output[aToB ? atob(k) : k] = serializableValue(v);
    }
  });

  return output;
}

function entityHasError(lrs: LinkReduxLRSType, iri: Node) {
  const status = lrs.getStatus(iri).status;

  return status !== null && status >= BAD_REQUEST;
}

function entityIsLoaded(lrs: LinkReduxLRSType, iri: Node) {
  return lrs.tryEntity(iri).length > 0 || lrs.getStatus(iri).status === OK;
}

function numAsc(a: Quad, b: Quad) {
  const aP = Number.parseInt(a.predicate.value.slice(base.length), 10);
  const bP = Number.parseInt(b.predicate.value.slice(base.length), 10);

  return aP - bP;
}

function serializableValue(v: any): object | object[] | File | string {
  if (Object.prototype.toString.apply(v) === '[object Object]'
      && !Object.prototype.hasOwnProperty.call(v, 'termType')) {
    return convertKeysAtoB(v);
  } else if (Array.isArray(v)) {
    return v.map((i) => serializableValue(i));
  } else if (v.datatype && v.datatype.value.startsWith('https://argu.co/ns/core#base64File')) {
    return dataURItoBlob(v);
  } else if (isLiteral(v) || isBlankNode(v)) {
    return v.value;
  }

  return v;
}

function listToArr(
    lrs: LinkReduxLRSType,
    acc: SomeTerm[],
    rest: Node | Node[],
): SomeTerm[] | Promise<void> {

  if (Array.isArray(rest)) {
    return rest;
  }
  if (!rest || rdf.equals(rest, rdfx.nil)) {
    return acc;
  }

  let first;
  if (rest.termType === 'BlankNode') {
    const firstStatement = lrs.store.find(rest, rdfx.first, null, null);
    first = firstStatement && firstStatement.object;
  } else {
    first = lrs.getResourceProperty<Node>(rest, rdfx.first);

    if (!first) {
      return lrs.getEntity(rest);
    }
  }
  if (rdf.equals(first, rdfx.nil)) {
    return acc;
  }
  if (first) {
    acc.push(first);
  }
  const nextRest = lrs.store.find(rest, rdfx.rest, null, null);
  if (nextRest) {
    const nextObj = nextRest.object;
    if (nextObj.termType === 'Literal' || (nextObj as any).termType === 'Collection') {
      throw new Error(`Rest value must be a resource, was ${nextObj.termType}`);
    }
    listToArr(lrs, acc, nextObj);
  }

  return acc;
}

function resourceHasType(lrs: LinkReduxLRSType, resource: Node, type: Node) {
  return resource && lrs.findSubject(resource, [rdfx.type], type).length > 0;
}

function seqToArr(
    lrs: LinkReduxLRSType,
    acc: SomeTerm[],
    rest: Node | Node[],
): SomeTerm[] {
  if (Array.isArray(rest)) {
    return rest;
  }
  if (!rest || rdf.equals(rest, rdfx.nil)) {
    return acc;
  }

  lrs
    .tryEntity(rest)
    .filter((s) => s && s.predicate.value.match(sequenceFilter) !== null)
    .sort(numAsc)
    .map((s) => acc.push(s.object));

  return acc;
}

function containerToArr(
    lrs: LinkReduxLRSType,
    acc: SomeTerm[],
    rest: Node | Node[],
): SomeTerm[] | Promise<void> {
  if (Array.isArray(rest)) {
    return rest;
  }

  // Detect loaded
  if (__CLIENT__ && !entityIsLoaded(lrs, rest)) {
    return rest.termType === 'NamedNode'
        ? lrs.getEntity(rest)
        : Promise.reject(`Can't resolve a ${rest.termType}`);
  }

  if (lrs.getResourceProperty(rest, rdfs.member)) {
    return seqToArr(lrs, acc, rest);
  } else if (lrs.getResourceProperty(rest, rdfx.first)) {
    return listToArr(lrs, acc, rest);
  }

  const pages = lrs.getResourceProperty<NamedNode>(rest, ontola.pages);
  if (pages) {
    return containerToArr(lrs, acc, pages);
  }
  const items = lrs.getResourceProperty<NamedNode>(rest, as.items);
  if (items) {
    return seqToArr(lrs, acc, items);
  }

  return acc;
}

function sort(order: string[]) {
  return (a: Node, b: Node) => {
    const oA = order.findIndex((o) => a.value.includes(o));
    const oB = order.findIndex((o) => b.value.includes(o));

    if (oA === -1 && oB === -1) { return compare(a, b); }
    if (oA === -1) { return 1; }
    if (oB === -1) { return -1; }

    return compare(oA, oB);
  };
}

function allow(arr: NamedNode[], whitelist = []) {
  return arr.filter((op) => whitelist.find(filterFind(op)));
}

function filter(arr: NamedNode[], blacklist = []) {
  return arr.filter((op) => !blacklist.find(filterFind(op)));
}

function filterSort(arr: NamedNode[], blacklist = [], order = []) {
  return filter(arr, blacklist).sort(sort(order));
}

function allowSort(arr: NamedNode[], whitelist = [], order = []) {
  return allow(arr, whitelist).sort(sort(order));
}

export {
  allow,
  allowSort,
  arraysEqual,
  bestType,
  containerToArr,
  convertKeysAtoB,
  entityHasError,
  entityIsLoaded,
  filter,
  filterFind,
  filterSort,
  listToArr,
  resourceHasType,
  seqToArr,
  sort,
};

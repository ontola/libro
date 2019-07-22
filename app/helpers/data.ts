import { OK } from 'http-status-codes';
import { LazyNNArgument, normalizeType } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import { Literal, NamedNode, SomeNode, SomeTerm, Statement } from 'rdflib';

import { sequenceFilter } from './iris';
import { NS } from './LinkedRenderStore';

const base = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_';

function filterFind(op: SomeNode) {
  return (bV: SomeNode | RegExp) => {
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
    switch (normalizedType.term) {
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

function convertKeysAtoB(obj: { [k: string]: any }): { [k: string]: any } {
  const output: { [k: string]: any } = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (k === '@id') {
      output[k] = v;
    } else if (Object.prototype.toString.apply(v) === '[object Object]'
        && !Object.prototype.hasOwnProperty.call(v, 'termType')) {
      output[atob(k)] = convertKeysAtoB(v);
    } else if (Array.isArray(v)) {
      // eslint-disable-next-line no-use-before-define
      output[atob(k)] = v.map((i) => serializableValue(i));
    } else if (v.datatype && v.datatype.value.startsWith('https://argu.co/ns/core#base64File')) {
      output[atob(k)] = dataURItoBlob(v);
    } else {
      output[atob(k)] = v;
    }
  });

  return output;
}

function entityIsLoaded(lrs: LinkReduxLRSType, iri: SomeNode) {
  return lrs.tryEntity(iri).length > 0 || lrs.getStatus(iri).status === OK;
}

function numAsc(a: Statement, b: Statement) {
  const aP = Number.parseInt(a.predicate.value.slice(base.length), 10);
  const bP = Number.parseInt(b.predicate.value.slice(base.length), 10);

  return aP - bP;
}

function serializableValue(v: any): object | object[] | File {
  if (Object.prototype.toString.apply(v) === '[object Object]'
      && !Object.prototype.hasOwnProperty.call(v, 'termType')) {
    return convertKeysAtoB(v);
  } else if (Array.isArray(v)) {
    return v.map((i) => serializableValue(i));
  } else if (v.datatype && v.datatype.value.startsWith('https://argu.co/ns/core#base64File')) {
    return dataURItoBlob(v);
  }

  return v;
}

function listToArr(
    lrs: LinkReduxLRSType,
    acc: SomeTerm[],
    rest: SomeNode | SomeNode[],
): SomeTerm[] | Promise<void> {

  if (Array.isArray(rest)) {
    return rest;
  }
  if (!rest || rest === NS.rdf('nil')) {
    return acc;
  }

  let first;
  if (rest.termType === 'BlankNode') {
    const firstStatement = lrs.store.anyStatementMatching(rest, NS.rdf('first'));
    first = firstStatement && firstStatement.object;
  } else {
    first = lrs.getResourceProperty(rest, NS.rdf('first'));

    if (!first) {
      return lrs.getEntity(rest);
    }
  }
  if (first) {
    acc.push(first);
  }
  const nextRest = lrs.store.anyStatementMatching(rest, NS.rdf('rest'));
  if (nextRest) {
    const nextObj = nextRest.object;
    if (nextObj.termType === 'Literal' || nextObj.termType === 'Collection') {
      throw new Error(`Rest value must be a resource, was ${nextObj.termType}`);
    }
    listToArr(lrs, acc, nextObj);
  }

  return acc;
}

function seqToArr(
    lrs: LinkReduxLRSType,
    acc: SomeTerm[],
    rest: SomeNode | SomeNode[],
): SomeTerm[] {
  if (Array.isArray(rest)) {
    return rest;
  }
  if (!rest || rest === NS.rdf('nil')) {
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
    rest: SomeNode | SomeNode[],
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

  if (lrs.getResourceProperty(rest, NS.rdfs.member)) {
    return seqToArr(lrs, acc, rest);
  } else if (lrs.getResourceProperty(rest, NS.rdf('first'))) {
    return listToArr(lrs, acc, rest);
  }

  return acc;
}

function sort(order: string[]) {
  return (a: SomeNode, b: SomeNode) => {
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
  entityIsLoaded,
  filter,
  filterSort,
  listToArr,
  seqToArr,
  sort,
};

import * as as from '@ontologies/as';
import rdf, {
  NamedNode,
  Node,
  Quad,
  SomeTerm,
  Term,
  isBlankNode,
  isLiteral,
  isNamedNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import {
  BAD_REQUEST,
  NOT_FOUND,
  OK,
} from 'http-status-codes';
import { LazyNNArgument, normalizeType } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { FileStore } from '../hooks/useFileStore';
import ontola from '../ontology/ontola';

import { sequenceFilter } from './iris';
import { isFileType } from './types';

const base = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_';

function filterFind(op: Node) {
  return (bV: Node | RegExp): boolean => {
    if (bV instanceof RegExp) {
      return bV.test(op.value);
    } else if (Object.prototype.hasOwnProperty.call(bV, 'termType')) {
      return bV.value === op.value && bV.termType === op.termType;
    }

    throw new Error('Match on regex or IRI');
  };
}

function arraysEqual(a: any[], b: any[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function bestType(type: LazyNNArgument): NamedNode | null {
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

function compare(a: Node | number, b: Node | number) {
  if (a < b) { return -1; }
  if (a > b) { return 1; }

  return 0;
}

function convertKeysAtoB(obj: { [k: string]: any }, fileStore: FileStore, aToB = true): { [k: string]: any } {
  const output: { [k: string]: any } = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (k === '@id') {
      output[k] = v;
    } else {
      output[aToB ? atob(k) : k] = serializableValue(v, fileStore);
    }
  });

  return output;
}

function entityHasError(lrs: LinkReduxLRSType, iri: Node): boolean {
  const status = lrs.getStatus(iri).status;

  return status !== null && status >= BAD_REQUEST;
}

function entityIsLoaded<T extends LinkReduxLRSType<unknown, any> = LinkReduxLRSType>(lrs: T, iri: Node | undefined): boolean {
  if (!iri) {
    return false;
  }

  return lrs.tryEntity(iri).length > 0 || [OK, NOT_FOUND].includes(lrs.getStatus(iri).status!);
}

function numAsc(a: Quad, b: Quad) {
  const aP = Number.parseInt(a.predicate.value.slice(base.length), 10);
  const bP = Number.parseInt(b.predicate.value.slice(base.length), 10);

  return aP - bP;
}

function serializableValue(v: any, fileStore: FileStore): any | any[] | File | string {
  if (Object.prototype.toString.apply(v) === '[object Object]'
      && !Object.prototype.hasOwnProperty.call(v, 'termType')) {
    return convertKeysAtoB(v, fileStore);
  } else if (Array.isArray(v)) {
    return v.map((i) => serializableValue(i, fileStore));
  } else if (isFileType(v)) {
    return fileStore[v.value];
  } else if (isLiteral(v) || isBlankNode(v)) {
    return v.value;
  }

  return v;
}

function listToArr<I extends Term = SomeTerm>(
  lrs: LinkReduxLRSType,
  acc: I[],
  rest: Node | I[],
): I[] | Promise<void> {

  if (Array.isArray(rest)) {
    return rest;
  }
  if (!rest || rdf.equals(rest, rdfx.nil)) {
    return acc;
  }

  let first;
  if (rest.termType === 'BlankNode') {
    const firstStatement = lrs.store.find(rest, rdfx.first, null, null);
    first = firstStatement && firstStatement.object as I;
  } else {
    first = lrs.getResourceProperty(rest, rdfx.first) as I;

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

function resourceHasType(lrs: LinkReduxLRSType, resource: Node, type: Node): boolean {
  return !!resource && lrs.findSubject(resource, [rdfx.type], type).length > 0;
}

function seqToArr<I extends Term = SomeTerm>(
  lrs: LinkReduxLRSType,
  acc: I[],
  rest: Node | I[],
): I[] {
  if (Array.isArray(rest)) {
    return rest;
  }
  if (!rest || rdf.equals(rest, rdfx.nil)) {
    return acc;
  }

  lrs.tryEntity(rest)
    .filter((s) => s && s.predicate.value.match(sequenceFilter) !== null)
    .sort(numAsc)
    .map((s) => acc.push(s.object as I));

  return acc;
}

function containerToArr<I extends Term = SomeTerm>(
  lrs: LinkReduxLRSType,
  acc: I[],
  rest: Node | I[],
): I[] | Promise<void> {
  if (Array.isArray(rest)) {
    return rest;
  }

  // Detect loaded
  if (__CLIENT__ && rest && !entityIsLoaded(lrs, rest)) {
    return isNamedNode(rest)
      ? lrs.getEntity(rest)
      : Promise.reject(`Can't resolve a ${rest.termType}`);
  }

  if (lrs.getResourceProperty(rest, rdfs.member)) {
    return seqToArr<I>(lrs, acc, rest);
  } else if (lrs.getResourceProperty(rest, rdfx.first)) {
    return listToArr<I>(lrs, acc, rest);
  }

  const pages = lrs.getResourceProperty<NamedNode>(rest, ontola.pages);
  if (pages) {
    return containerToArr(lrs, acc, pages);
  }
  const items = lrs.getResourceProperty<NamedNode>(rest, as.items);
  if (items) {
    return seqToArr<I>(lrs, acc, items);
  }

  return acc;
}

function sort(order: string[]) {
  return (a: Node, b: Node): number => {
    const oA = order.findIndex((o) => a.value.includes(o));
    const oB = order.findIndex((o) => b.value.includes(o));

    if (oA === -1 && oB === -1) { return compare(a, b); }
    if (oA === -1) { return 1; }
    if (oB === -1) { return -1; }

    return compare(oA, oB);
  };
}

function allow(arr: NamedNode[], whitelist: RegExp[] = []): NamedNode[] {
  return arr.filter((op) => whitelist.find(filterFind(op)));
}

function filter(arr: NamedNode[], blacklist: RegExp[] = []): NamedNode[] {
  return arr.filter((op) => !blacklist.find(filterFind(op)));
}

function filterSort(arr: NamedNode[], blacklist: RegExp[] = [], order: string[] = []): NamedNode[] {
  return filter(arr, blacklist).sort(sort(order));
}

function allowSort(arr: NamedNode[], whitelist: RegExp[] = [], order: string[] = []): NamedNode[] {
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

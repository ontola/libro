import * as as from '@ontologies/as';
import rdf, {
  NamedNode,
  Node,
  QuadPosition,
  Quadruple,
  SomeTerm,
  Term,
  isNamedNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import {
  LazyNNArgument,
  RecordState,
  normalizeType,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import argu from '../ontology/argu';
import ontola from '../ontology/ontola';

import { sequenceFilter } from './iris';

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

function entityIsLoaded<T extends LinkReduxLRSType<unknown, any> = LinkReduxLRSType>(lrs: T, iri: Node | undefined): boolean {
  if (!iri) {
    return false;
  }

  return lrs.getState(iri.value).current === RecordState.Present;
}

function numAsc(a: Quadruple, b: Quadruple) {
  const aP = Number.parseInt(a[QuadPosition.predicate].value.slice(base.length), 10);
  const bP = Number.parseInt(b[QuadPosition.predicate].value.slice(base.length), 10);

  return aP - bP;
}

function serializableValue(v: any): any | any[] | File | string {
  if (Object.prototype.toString.apply(v) === '[object Object]'
      && !Object.prototype.hasOwnProperty.call(v, 'termType')) {
    return convertKeysAtoB(v);
  } else if (Array.isArray(v)) {
    return v.map((i) => serializableValue(i));
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
    const [firstStatement] = lrs.store.match(rest, rdfx.first, null, true);
    first = firstStatement && firstStatement[QuadPosition.object] as I;
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

  const nextRest = lrs.store.match(rest, rdfx.rest, null, true)[0];

  if (nextRest) {
    const nextObj = nextRest[QuadPosition.object];

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
    .filter((s) => s && s[QuadPosition.predicate].value.match(sequenceFilter) !== null)
    .sort(numAsc)
    .map((s) => acc.push(s[QuadPosition.object] as I));

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

  const terms = lrs.getResourceProperty<NamedNode>(rest, argu.terms);

  if (terms) {
    return containerToArr<I>(lrs, acc, terms);
  }

  return acc;
}

function sort(order: string[]) {
  return (a: SomeTerm, b: SomeTerm): number => {
    const oA = order.findIndex((o) => a.value.includes(o));
    const oB = order.findIndex((o) => b.value.includes(o));

    if (oA === -1 && oB === -1) { return compare(a as Node, b as Node); }
    if (oA === -1) { return 1; }
    if (oB === -1) { return -1; }

    return compare(oA, oB);
  };
}

function allow(arr: NamedNode[], whitelist: Array<Node | RegExp> = []): NamedNode[] {
  return arr.filter((op) => whitelist.find(filterFind(op)));
}

function filter(arr: NamedNode[], blacklist: Array<Node | RegExp> = []): NamedNode[] {
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
  entityIsLoaded,
  filter,
  filterFind,
  filterSort,
  listToArr,
  resourceHasType,
  seqToArr,
  sort,
};

import {
  NamedNode,
  Node,
  SomeTerm,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import {
  LazyNNArgument,
  normalizeType,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

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

function serializableValue(v: any): any | any[] | File | string {
  if (Object.prototype.toString.apply(v) === '[object Object]'
      && !Object.prototype.hasOwnProperty.call(v, 'termType')) {
    return convertKeysAtoB(v);
  } else if (Array.isArray(v)) {
    return v.map((i) => serializableValue(i));
  }

  return v;
}

function resourceHasType(lrs: LinkReduxLRSType, resource: Node, type: Node): boolean {
  return !!resource && lrs.findSubject(resource, [rdfx.type], type).length > 0;
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
  convertKeysAtoB,
  filter,
  filterFind,
  filterSort,
  resourceHasType,
  sort,
};

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
import { LinkedDataAPI } from 'link-lib';
import {
  LinkReduxLRSType,
  isBackgroundLoading,
  isFullyLoaded,
} from 'link-redux';

import ontola from '../ontology/ontola';

const sequenceFilter = /^http:\/\/www\.w3\.org\/1999\/02\/22-rdf-syntax-ns#_[\d]+$/;
const seqBase = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_';

function numAsc(a: Quadruple, b: Quadruple) {
  const aP = Number.parseInt(a[QuadPosition.predicate].value.slice(seqBase.length), 10);
  const bP = Number.parseInt(b[QuadPosition.predicate].value.slice(seqBase.length), 10);

  return aP - bP;
}

export function listToArr<I extends Term = SomeTerm>(
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

export function seqToArr<I extends Term = SomeTerm>(
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

export function containerToArr<I extends Term = SomeTerm>(
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

  const terms = lrs.getResourceProperty<NamedNode>(rest, ontola.terms);

  if (terms) {
    return containerToArr<I>(lrs, acc, terms);
  }

  return acc;
}

export function entityIsLoaded<T extends LinkReduxLRSType<unknown, LinkedDataAPI>>(lrs: T, iri: Node | undefined): boolean {
  if (!iri) {
    return false;
  }

  const status = lrs.getState(iri.value);

  return isFullyLoaded(status) || isBackgroundLoading(status);
}

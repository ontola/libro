import * as as from '@ontologies/as';
import {
  SomeTerm,
  Term,
  isNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import { SomeNode } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { entityIsLoaded, resourceHasType } from '../../../../helpers/data';
import collectionMembers from '../../../../helpers/diggers';
import ontola from '../../../../ontology/ontola';

const isCollection = (lrs: LinkReduxLRSType, value: Term[]) => {
  const firstValue = value[0];

  return value?.length === 1 && isNode(firstValue) && resourceHasType(lrs, firstValue, as.Collection);
};

const isSequence = (lrs: LinkReduxLRSType, value: Term[]) => {
  const firstValue = value[0];

  return value?.length === 1 && isNode(firstValue) && resourceHasType(lrs, firstValue, rdfx.Seq);
};

export const getNestedObjects = (lrs: LinkReduxLRSType, value: SomeTerm[]): SomeNode[] => {
  const firstValue = value.filter(isNode)[0];

  if (isCollection(lrs, value)) {
    const pages = lrs.getResourceProperties(firstValue, ontola.pages).filter(isNode);

    if (entityIsLoaded(lrs, pages[0])) {
      return lrs.dig(firstValue, collectionMembers).filter(isNode);
    }

    return pages;
  } else if (isSequence(lrs, value)) {
    return lrs.getResourceProperties(firstValue, rdfs.member).filter(isNode);
  }

  return value.filter(isNode);
};


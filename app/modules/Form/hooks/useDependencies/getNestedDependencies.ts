import * as as from '@ontologies/as';
import {
  QuadPosition,
  Quadruple,
  SomeTerm,
  Term,
  isNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import { SomeNode } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { collectionMembers } from '../../../Collection/lib/diggers';
import { resourceHasType } from '../../../Common/lib/data';
import { entityIsLoaded } from '../../../Kernel/lib/data';
import ontola from '../../../Kernel/ontology/ontola';

const isCollection = (lrs: LinkReduxLRSType, value: Term[]) => {
  const firstValue = value[0];

  return value?.length === 1 && isNode(firstValue) && resourceHasType(lrs, firstValue, as.Collection);
};

const isSequence = (lrs: LinkReduxLRSType, value: Term[]) => {
  const firstValue = value[0];

  return value?.length === 1 && isNode(firstValue) && resourceHasType(lrs, firstValue, rdfx.Seq);
};

export const getNestedDependencies = (lrs: LinkReduxLRSType, value: SomeTerm[], intermediate: boolean): SomeNode[] => {
  const firstValue = value.filter(isNode)[0];

  if (isCollection(lrs, value)) {
    const pages = lrs.getResourceProperties(firstValue, ontola.pages).filter(isNode);

    if (entityIsLoaded(lrs, pages[0])) {
      if (intermediate) {
        const [quadruples, intermediates] = lrs.digDeeper(firstValue, collectionMembers);

        return [
          firstValue,
          ...pages,
          ...(intermediates as SomeNode[]) ?? [],
          ...(quadruples as Quadruple[])?.map((q) => q[QuadPosition.object])?.filter(isNode) ?? [],
        ];
      }

      return lrs.dig(firstValue, collectionMembers).filter(isNode);
    }

    if (intermediate) {
      return [
        firstValue,
        ...pages,
      ];
    }

    return pages;
  } else if (isSequence(lrs, value)) {
    if (intermediate) {
      return [
        firstValue,
        ...lrs.getResourceProperties(firstValue, rdfs.member).filter(isNode),
      ];
    }

    return lrs.getResourceProperties(firstValue, rdfs.member).filter(isNode);
  }

  return value.filter(isNode);
};


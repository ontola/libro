import { Node, SomeTerm } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import { LinkReduxLRSType } from 'link-redux';

import argu from '../../Argu/ontology/argu';

export const createFlattenFunction = (lrs: LinkReduxLRSType): <T extends SomeTerm>(leaf: T, top?: boolean) => T[] => {
  const flattenChapters = <T extends SomeTerm>(leaf: T, top = true): T[] => {
    const members = lrs.dig(leaf as Node, [top ? argu.chapters : argu.subChapters, rdfs.member]) as T[];

    return [
      ...(!top ? [leaf] : []),
      ...(members.length > 0 ? members.flatMap((x) => [...flattenChapters(x, false)]) : []),
    ];
  };

  return flattenChapters;
};

import { Node, SomeTerm } from '@ontologies/core';
import { LinkReduxLRSType } from 'link-redux';
import * as rdfs from '@ontologies/rdfs';

import argu from '../../ontology/argu';

export const createFlattenFunction = (lrs: LinkReduxLRSType): (leaf: SomeTerm, top?: boolean) => SomeTerm[] => {
  const flattenChapters = (leaf: SomeTerm, top = true): SomeTerm[] => {
    const members = lrs.dig(leaf as Node, [top ? argu.chapters : argu.ns('subChapters'), rdfs.member]);

    return [
      ...(!top ? [leaf] : []),
      ...(members.length > 0 ? members.flatMap((x) => [...flattenChapters(x, false)]) : []),
    ];
  };

  return flattenChapters;
};

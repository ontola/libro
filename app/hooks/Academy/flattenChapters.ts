import { Node, SomeTerm } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import { LinkReduxLRSType } from 'link-redux';

import argu from '../../ontology/argu';

export const createFlattenFunction = (lrs: LinkReduxLRSType): (leaf: SomeTerm, top?: boolean) => SomeTerm[] => {
  const flattenChapters = (leaf: SomeTerm, top = true): SomeTerm[] => {
    const members = lrs.dig(leaf as Node, [top ? argu.chapters : argu.subChapters, rdfs.member]);

    return [
      ...(!top ? [leaf] : []),
      ...(members.length > 0 ? members.flatMap((x) => [...flattenChapters(x, false)]) : []),
    ];
  };

  return flattenChapters;
};

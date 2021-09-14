import { SomeTerm, isNamedNode } from '@ontologies/core';
import { LinkReduxLRSType } from 'link-redux';

import ontola from '../../../ontology/ontola';

export const sortByGroup = (lrs: LinkReduxLRSType) => (a: SomeTerm, b: SomeTerm): -1 | 0 | 1 => {
  const groupA = isNamedNode(a) ? lrs.getResourceProperty(a, ontola.groupBy)?.value : undefined;
  const groupB = isNamedNode(b) ? lrs.getResourceProperty(b, ontola.groupBy)?.value : undefined;

  if (!groupA || groupB && groupA < groupB) {
    return -1;
  }

  if (!groupB || groupA > groupB) {
    return 1;
  }

  if (a.value === groupA) {
    return -1;
  }

  if (b.value === groupB) {
    return 1;
  }

  return 0;
};

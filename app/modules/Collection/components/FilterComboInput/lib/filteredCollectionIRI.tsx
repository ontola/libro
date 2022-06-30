import rdf, { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { IRITemplate } from '../../../../Common/hooks/useIRITemplate';
import ontola from '../../../../Core/ontology/ontola';

import { FilterValue } from './FilterValue';

export const createFilterParam = (lrs: LinkReduxLRSType, filter: FilterValue): string => {
  const filterKey = lrs.getResourceProperty(filter.key as SomeNode, ontola.filterKey);

  return `${encodeURIComponent(filterKey?.value ?? '')}=${encodeURIComponent(filter.value.value)}`;
};

export const filteredCollectionIRI = (
  lrs: LinkReduxLRSType,
  value: FilterValue[],
  iriTemplate: IRITemplate,
): NamedNode => {
  const params: string[] = value.map((val) => createFilterParam(lrs, val));

  const url = iriTemplate.set({ 'filter%5B%5D': params })?.value ?? '';

  return rdf.namedNode(url);
};

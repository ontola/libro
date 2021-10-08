import rdf, { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  useDataFetching,
  useGlobalIds,
} from 'link-redux';

import useCollectionRefresh from '../components/Collection/useCollectionRefresh';
import argu from '../ontology/argu';

import { ResolvedArray, useContainerToArr } from './useContainerToArr';

export const phaseIRI = (project: NamedNode, index: number): NamedNode => {
  const url = new URL(project.value);
  url.hash = (index + 1).toString();

  return rdf.namedNode(url.toString());
};

const usePhases = (project: SomeNode): ResolvedArray<SomeNode> => {
  useDataFetching(project);

  const [phases] = useGlobalIds(project, argu.phases);
  useCollectionRefresh(phases);

  return useContainerToArr<SomeNode>(phases);
};

export default usePhases;

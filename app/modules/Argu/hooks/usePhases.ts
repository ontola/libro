import rdf, { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { useDataFetching, useGlobalIds } from 'link-redux';

import { ResolvedArray, useContainerToArr } from '../../Core/hooks/useContainerToArr';
import argu from '../lib/argu';

export const phaseIRI = (project: NamedNode, index: number): NamedNode => {
  const url = new URL(project.value);
  url.hash = (index + 1).toString();

  return rdf.namedNode(url.toString());
};

const usePhases = (project: SomeNode): ResolvedArray<SomeNode> => {
  useDataFetching(project);

  const [phases] = useGlobalIds(project, argu.phases);

  return useContainerToArr<SomeNode>(phases);
};

export default usePhases;

import rdf, { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { useDataFetching, useResourceProperty } from 'link-redux';

import argu from '../ontology/argu';

import { ResolvedArray, useContainerToArr } from './useContainerToArr';

export const phaseIRI = (project: NamedNode, index: number): NamedNode => {
  const url = new URL(project.value);
  url.hash = (index + 1).toString();

  return rdf.namedNode(url.toString());
};

const usePhases = (project: SomeNode): ResolvedArray<SomeNode> => {
  useDataFetching(project);

  const [phases] = useResourceProperty(project, argu.phases) as NamedNode[];

  return useContainerToArr<SomeNode>(phases);
};

export default usePhases;

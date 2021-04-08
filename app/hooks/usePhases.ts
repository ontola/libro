import rdf, { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { useDataFetching, useResourceProperty } from 'link-redux';

import argu from '../ontology/argu';

import { useContainerToArr } from './useContainerToArr';

export const phaseIRI = (project: NamedNode, index: number): NamedNode => {
  const url = new URL(project.value);
  url.hash = (index + 1).toString();

  return rdf.namedNode(url.toString());
};

export type UsePhases = [SomeNode[], boolean];

const usePhases = (project: SomeNode): UsePhases => {
  useDataFetching(project);

  const [phases] = useResourceProperty(project, argu.phases) as NamedNode[];

  const phaseAcc = useContainerToArr<SomeNode>(phases);

  return Array.isArray(phaseAcc)
    ? [phaseAcc, true]
    : [[], false];
};

export default usePhases;

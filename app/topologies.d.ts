import { NamedNode } from '@ontologies/core';

export const allTopologies: NamedNode[];
export function allTopologiesExcept(...topologies: NamedNode[]): NamedNode[];
export const topologyComponentMap: { [k: number]: () => any };

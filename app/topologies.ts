import rdf, { NamedNode } from '@ontologies/core';

import academyTopologies from './modules/Academy/topologies';
import actionTopologies from './modules/Action/topologies';
import commonTopologies from './modules/Common/topologies';
import flowOntologies from './modules/Flow/topologies';
import formOntologies from './modules/Form/topologies';
import menuTopologies from './modules/Menu/topologies';
import navbarTopologies from './modules/NavBar/topologies';
import omniformTopologies from './modules/Omniform/topologies';
import salesTopologies from './modules/SalesWebsite/topologies';
import tableTopologies from './modules/Table/topologies';

export const allTopologies: NamedNode[] = [
  undefined as unknown as NamedNode,
  ...academyTopologies,
  ...actionTopologies,
  ...commonTopologies,
  ...flowOntologies,
  ...formOntologies,
  ...menuTopologies,
  ...navbarTopologies,
  ...omniformTopologies,
  ...salesTopologies,
  ...tableTopologies,
];

export function allTopologiesExcept(...topologies: NamedNode[]): NamedNode[] {
  const filtered = allTopologies.slice();
  topologies.forEach((t) => {
    const i = filtered.findIndex((f) => rdf.equals(f, t));

    if (i !== -1) {
      filtered.splice(i, 1);
    }
  });

  return filtered;
}

export const getTopologyNumber = (topology?: NamedNode): number => allTopologies
  .findIndex((item) => rdf.equals(topology, item));

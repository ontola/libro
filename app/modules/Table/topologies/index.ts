import rdf from '@ontologies/core';

import tabBarTopologyComponent from '../../Common/topologies/TabBar';
import { TopologyMap } from '../../Kernel/lib/ontology';

import tableTopologyComponent, { tableTopology } from './Table';
import tableBodyComponent, { tableBodyTopology } from './TableBody';
import tableCellTopologyComponent, { tableCellTopology } from './TableCell';
import { tableFooterTopology } from './TableFooter';
import tableFooterCellTopologyComponent, { tableFooterCellTopology } from './TableFooterCell';
import tableFooterRowTopologyComponent, { tableFooterRowTopology } from './TableFooterRow';
import { tableHeadTopology } from './TableHead';
import tableHeaderCellTopologyComponent, { tableHeaderCellTopology } from './TableHeaderCell';
import tableHeaderRowTopologyComponent, { tableHeaderRowTopology } from './TableHeaderRow';
import { tableRowTopology } from './TableRow';

export const topologyMap: TopologyMap = {
  [rdf.id(tableBodyTopology)]: [tableBodyComponent, undefined],
  [rdf.id(tableCellTopology)]: [tabBarTopologyComponent, undefined],
  [rdf.id(tableHeaderCellTopology)]: [tableTopologyComponent, undefined],
  [rdf.id(tableHeaderRowTopology)]: [tableCellTopologyComponent, undefined],
  [rdf.id(tableFooterCellTopology)]: [tableFooterCellTopologyComponent, undefined],
  [rdf.id(tableFooterRowTopology)]: [tableFooterRowTopologyComponent, undefined],
  [rdf.id(tableRowTopology)]: [tableHeaderCellTopologyComponent, undefined],
  [rdf.id(tableTopology)]: [tableHeaderRowTopologyComponent, undefined],
};

export default [
  tableTopology,
  tableBodyTopology,
  tableCellTopology,
  tableFooterTopology,
  tableFooterCellTopology,
  tableFooterRowTopology,
  tableHeadTopology,
  tableHeaderCellTopology,
  tableHeaderRowTopology,
  tableRowTopology,
];

import rdf from '@ontologies/core';

import tabBarTopologyComponent from '../../Common/topologies/TabBar';
import { TopologyMap } from '../../Kernel/lib/ontology';

import tableTopologyComponent from './Table';
import tableBodyComponent from './TableBody';
import tableCellTopologyComponent from './TableCell';
import tableFooterCellTopologyComponent from './TableFooterCell';
import tableFooterRowTopologyComponent from './TableFooterRow';
import tableHeaderCellTopologyComponent from './TableHeaderCell';
import tableHeaderRowTopologyComponent from './TableHeaderRow';

import {
  tableBodyTopology,
  tableCellTopology,
  tableFooterCellTopology,
  tableFooterRowTopology,
  tableHeaderCellTopology,
  tableHeaderRowTopology,
  tableRowTopology,
  tableTopology,
} from './index';

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

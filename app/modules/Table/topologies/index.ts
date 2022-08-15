import ontola from '../../Kernel/ontology/ontola';

export const tableTopology = ontola.ns('table');
export const tableRowTopology = ontola.ns('tableRow');
export const tableHeaderRowTopology = ontola.ns('tableHeaderRow');
export const tableHeaderCellTopology = ontola.ns('tableHeaderCell');
export const tableHeadTopology = ontola.ns('tableHead');
export const tableFooterRowTopology = ontola.ns('tableFooterRow');
export const tableFooterCellTopology = ontola.ns('tableFooterCell');
export const tableFooterTopology = ontola.ns('tableFooter');
export const tableCellTopology = ontola.ns('tableCell');
export const tableBodyTopology = ontola.ns('tableBody');

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

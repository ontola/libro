import properties from './properties';
import ThingTable from './ThingTable';
import ThingTableCell from './ThingTableCell';
import ThingTableHeaderRow from './ThingTableHeaderRow';
import ThingTableRow from './ThingTableRow';

export default [
  ...properties,
  ...ThingTable,
  ...ThingTableCell,
  ...ThingTableHeaderRow,
  ...ThingTableRow,
];

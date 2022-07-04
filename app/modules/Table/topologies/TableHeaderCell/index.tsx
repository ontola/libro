import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme, Margin } from '../../../Common/theme/types';
import { TopologyFC } from '../../../Core/lib/topology';
import ontola from '../../../Core/ontology/ontola';

export const tableHeaderCellTopology = ontola.ns('tableHeaderCell');

const useStyles = makeStyles((theme: LibroTheme) => createStyles({
  tableHeaderCell: {
    padding: theme.spacing(Margin.Small),
    textAlign: 'left',
    wordBreak: 'normal',
  },
}));

type TableHeaderCellProps = React.ThHTMLAttributes<HTMLTableCellElement>;

const TableHeaderCell: TopologyFC<TableHeaderCellProps> = ({ children, className, ...elemProps }) => {
  const [TableHeaderCellTopology] = useTopologyProvider(tableHeaderCellTopology);
  const classes = useStyles();

  return (
    <TableHeaderCellTopology>
      <th
        className={clsx(classes.tableHeaderCell, className)}
        {...elemProps}
      >
        {children}
      </th>
    </TableHeaderCellTopology>
  );
};

export default TableHeaderCell;

import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme, Margin } from '../../../Kernel/lib/themes';
import { tableHeaderCellTopology } from '../index';

const useStyles = makeStyles((theme: LibroTheme) => createStyles({
  tableHeaderCell: {
    padding: theme.spacing(Margin.Small),
    textAlign: 'left',
    wordBreak: 'normal',
  },
}));

type TableHeaderCellProps = React.ThHTMLAttributes<HTMLTableCellElement>;
const TableHeaderCellTopology = createTopologyProvider(tableHeaderCellTopology);

const TableHeaderCell: TopologyFC<TableHeaderCellProps> = ({ children, className, ...elemProps }) => {
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

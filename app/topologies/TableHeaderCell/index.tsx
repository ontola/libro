import { useTopologyProvider } from 'link-redux';
import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { LibroTheme, Margin } from '../../themes/themes';
import { tableHeaderCellTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

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

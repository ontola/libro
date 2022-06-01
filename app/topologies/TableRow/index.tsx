import { TableRow as MUITableRow } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';

import { LibroTheme } from '../../themes/themes';
import { tableRowTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

const useStyles = makeStyles((theme: LibroTheme) => ({
  tableRowClickable: {
    '&:hover': {
      background: theme.palette.grey.xxLight,
      cursor: 'pointer',
    },
  },
}));

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

const TableRow: TopologyFC<TableRowProps> = ({ children, className, ...elemProps }) => {
  const [TableRowTopology, subject] = useTopologyProvider(tableRowTopology);
  const classes = useStyles();

  return (
    <TableRowTopology>
      <MUITableRow
        className={clsx({
          [classes.tableRowClickable]: !!elemProps.onClick,
          [className ?? '']: !!className,
        })}
        resource={subject && subject.value}
        {...elemProps}
      >
        {children}
      </MUITableRow>
    </TableRowTopology>
  );
};

export default TableRow;

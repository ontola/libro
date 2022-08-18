import { TableRow as MUITableRow } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import {
  TopologyFC,
  createTopologyProvider,
  useLinkRenderContext, 
} from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { tableRowTopology } from '../index';

const useStyles = makeStyles((theme: LibroTheme) => ({
  tableRowClickable: {
    '&:hover': {
      background: theme.palette.grey.xxLight,
      cursor: 'pointer',
    },
  },
}));

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

const TableRowTopology = createTopologyProvider(tableRowTopology);

const TableRow: TopologyFC<TableRowProps> = ({ children, className, ...elemProps }) => {
  const classes = useStyles();
  const { subject } = useLinkRenderContext();

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

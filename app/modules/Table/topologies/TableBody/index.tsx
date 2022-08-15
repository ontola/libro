import { TableBody as MUITableBody, TableBodyProps as MUITableBodyProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { TopologyFC } from '../../../Kernel/lib/topology';
import { tableBodyTopology } from '../index';

const useStyles = makeStyles((theme: LibroTheme) => ({
  tableBody: {
    '&:nth-child(odd)': {
      backgroundColor: theme.palette.grey.xLight,
    },
  },
}));

const TableBody: TopologyFC<MUITableBodyProps> = ({ children, ...muiProps }) => {
  const [TableBodyTopology] = useTopologyProvider(tableBodyTopology);
  const classes = useStyles();

  return (
    <TableBodyTopology>
      <MUITableBody
        className={classes.tableBody}
        {...muiProps}
      >
        {children}
      </MUITableBody>
    </TableBodyTopology>
  );
};

export default TableBody;

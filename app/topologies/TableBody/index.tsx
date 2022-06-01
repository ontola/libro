import { TableBody as MUITableBody, TableBodyProps as MUITableBodyProps } from '@mui/material';
import { useTopologyProvider } from 'link-redux';
import React from 'react';
import { makeStyles } from '@mui/styles';

import { LibroTheme } from '../../themes/themes';
import { tableBodyTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

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

import { TableBody as MUITableBody, TableBodyProps as MUITableBodyProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Common/theme/types';
import { TopologyFC } from '../../../Core/lib/topology';
import ontola from '../../../Core/ontology/ontola';

export const tableBodyTopology = ontola.ns('tableBody');

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

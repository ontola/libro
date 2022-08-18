import { Table as MUITable, TableContainer } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme, Margin } from '../../../Kernel/lib/themes';
import { tableTopology } from '../index';

const useStyles = makeStyles((theme: LibroTheme) => ({
  table: {
    '& td': {
      '& .fa': {
        color: theme.palette.grey.xxLightForegroundSmall,
      },
      '& [disabled]': {
        '& .fa': {
          color: theme.palette.grey.xLight,
        },
      },
      '& a': {
        margin: '0 .1rem',
      },
    },
    '& tr': {
      '& > *:first-child': {
        paddingLeft: theme.spacing(Margin.Large),
      },
      borderBottom: theme.palette.grey.xLight,
    },
    width: '100%',
  },
  tableWrapper: {
    maxWidth: '100%',
  },
}));
const TableTopology = createTopologyProvider(tableTopology);

const Table: TopologyFC = ({ children }) => {
  const classes = useStyles();

  return (
    <TableTopology>
      <TableContainer className={classes.tableWrapper}>
        <MUITable className={classes.table}>
          {children}
        </MUITable>
      </TableContainer>
    </TableTopology>
  );
};

export default Table;

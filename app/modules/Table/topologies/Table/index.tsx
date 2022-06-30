import { Table as MUITable, TableContainer } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme, Margin } from '../../../../themes/themes';
import { TopologyFC } from '../../../Core/lib/topology';
import ontola from '../../../Core/ontology/ontola';

export const tableTopology = ontola.ns('table');

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

const Table: TopologyFC = ({ children }) => {
  const [TableTopology] = useTopologyProvider(tableTopology);
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

import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme, Margin } from '../../../Common/theme/types';
import { TopologyFC } from '../../../Core/lib/topology';
import ontola from '../../../Core/ontology/ontola';
import { tableFooterCellCID } from '../TableFooterCell';

export const tableFooterTopology = ontola.ns('tableFooter');

const useStyles = makeStyles((theme: LibroTheme) => ({
  tableFooter: {
    '& tr > td': {
      '&:first-child': {
        borderBottomLeftRadius: theme.shape.borderRadius,
      },
      '&:last-child': {
        borderBottomRightRadius: theme.shape.borderRadius,
      },
      backgroundColor: theme.palette.grey.xxLight,
      // to prevent double border from Card
      borderBottom: 0,
      padding: 0,

      [`&.${tableFooterCellCID}`]: {
        padding: `${theme.spacing(Margin.Small)} ${theme.spacing(Margin.Large)}`,
        textAlign: 'left',
      },
    },
    color: theme.palette.grey.midDark,
  },
}));

const TableFooter: TopologyFC = ({ children }) => {
  const [TableFooterTopology] = useTopologyProvider(tableFooterTopology);
  const classes = useStyles();

  return (
    <TableFooterTopology>
      <tfoot className={classes.tableFooter}>
        {children}
      </tfoot>
    </TableFooterTopology>
  );
};

export default TableFooter;

import { makeStyles } from '@mui/styles';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme, Margin } from '../../../Kernel/lib/themes';
import { tableFooterTopology } from '../index';
import { tableFooterCellCID } from '../TableFooterCell';

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
const TableFooterTopology = createTopologyProvider(tableFooterTopology);

const TableFooter: TopologyFC = ({ children }) => {
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

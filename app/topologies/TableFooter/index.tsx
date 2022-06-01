import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';

import argu from '../../modules/Argu/ontology/argu';
import { LibroTheme, Margin } from '../../themes/themes';
import { tableFooterCellCID } from '../TableFooterCell';
import { TopologyFC } from '../Topology';

export const tableFooterTopology = argu.ns('tableFooter');

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

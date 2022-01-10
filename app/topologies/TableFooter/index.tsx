import { WithStyles, withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { PropsWithChildren } from 'react';

import argu from '../../ontology/argu';
import { LibroTheme, Margin } from '../../themes/themes';
import { tableFooterCellCID } from '../TableFooterCell';
import Topology from '../Topology';

export const tableFooterTopology = argu.ns('tableFooter');

const styles = (theme: LibroTheme) => ({
  tableFooter: {
    '& tr > td': {
      '&:first-child': {
        borderBottomLeftRadius: theme.shape.borderRadius,
      },
      '&:last-child': {
        borderBottomRightRadius: theme.shape.borderRadius,
      },
      backgroundColor: theme.palette.grey.xxLight,
      padding: 0,

      [`&.${tableFooterCellCID}`]: {
        padding: `${theme.spacing(Margin.Small)} ${theme.spacing(Margin.Large)}`,
        textAlign: 'left',
      },
    },
    color: theme.palette.grey.midDark,
  },
});

type TableFooterProps = PropsWithChildren<WithStyles<typeof styles>>;

class TableFooter extends Topology<TableFooterProps> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: TableFooterProps) {
    super(props);

    this.className = props.classes.tableFooter;
    this.elementType = 'tfoot';
    this.topology = tableFooterTopology;
  }
}

export default withStyles(styles)(TableFooter);

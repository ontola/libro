import { WithStyles, withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { PropsWithChildren } from 'react';

import argu from '../../modules/Argu/ontology/argu';
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
});

type TableFooterProps = PropsWithChildren<WithStyles<typeof styles>>;

class TableFooter extends Topology<TableFooterProps> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: TableFooterProps) {
    super(props);

    this.className = this.getClassName();
    this.elementType = 'tfoot';
    this.topology = tableFooterTopology;
  }

  public getClassName(): string {
    return this.props.classes.tableFooter;
  }
}

export default withStyles(styles)(TableFooter);

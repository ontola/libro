import { WithStyles, withStyles } from '@material-ui/styles';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import { PropsWithChildren } from 'react';

import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';

export const tableHeadTopology = argu.ns('tableHead');

const styles = (theme: LibroTheme) => ({
  tableHead: {
    '& button': {
      cursor: 'pointer',
    },
    '& tr > th': {
      '&:first-child': {
        borderTopLeftRadius: theme.shape.borderRadius,
      },
      '&:last-child': {
        borderTopRightRadius: theme.shape.borderRadius,
      },
      backgroundColor: theme.palette.grey.xxLight,
    },
    color: theme.palette.grey.midDark,
  },
});

type TableHeadProps = PropsWithChildren<WithStyles<typeof styles>>;

class TableHead extends TopologyProvider<TableHeadProps> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: TableHeadProps) {
    super(props);

    this.className = this.props.classes.tableHead;
    this.elementType = 'thead';
    this.topology = tableHeadTopology;
  }
}

export default withStyles(styles)(TableHead);

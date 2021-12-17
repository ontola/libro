import { WithStyles, withStyles } from '@material-ui/styles';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import { PropsWithChildren } from 'react';

import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';

export const tableBodyTopology = argu.ns('tableBody');

const styles = (theme: LibroTheme) => ({
  tableBody: {
    '&:nth-child(odd)': {
      backgroundColor: theme.palette.grey.xLight,
    },
  },
});

type TableBodyProps = PropsWithChildren<WithStyles<typeof styles>>;

class TableBody extends TopologyProvider<TableBodyProps> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: TableBodyProps) {
    super(props);

    this.className = this.props.classes.tableBody;
    this.elementType = 'tbody';
    this.topology = tableBodyTopology;
  }
}

export default withStyles(styles)(TableBody);

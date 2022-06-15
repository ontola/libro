import {
  WithStyles,
  createStyles,
  withStyles, 
} from '@mui/styles';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import { ReactNode } from 'react';

import { LibroTheme, Margin } from '../../themes/themes';
import { tableHeaderCellTopology } from '../../topologies';

const styles = (theme: LibroTheme) => createStyles({
  tableHeaderCell: {
    padding: `${theme.spacing(Margin.Small)} ${theme.spacing(Margin.Small)}`,
    textAlign: 'left',
    wordBreak: 'normal',
  },
});

type TableHeaderCellProps = WithStyles<typeof styles> & {
  children?: ReactNode;
  title?: string;
};

class TableHeaderCell extends TopologyProvider<TableHeaderCellProps> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: TableHeaderCellProps) {
    super(props);

    this.className = this.getClassName();
    this.elementType = 'th';
    this.topology = tableHeaderCellTopology;
  }

  public getClassName(): string {
    return this.props.classes.tableHeaderCell;
  }
}

export default withStyles(styles)(TableHeaderCell);

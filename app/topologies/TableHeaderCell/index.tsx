import { createStyles } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import { ReactNode } from 'react';

import argu from '../../ontology/argu';
import { LibroTheme, Margin } from '../../themes/themes';

export const tableHeaderCellTopology = argu.ns('tableHeaderCell');

const styles = (theme: LibroTheme) => createStyles({
  tableHeaderCell: {
    padding: `${theme.spacing(Margin.Small)} ${theme.spacing(Margin.Small)}`,
    textAlign: 'left',
    wordBreak: 'normal',
  },
});

type TableHeaderCellProps = WithStyles<typeof styles> & {
  children?: ReactNode;
};

class TableHeaderCell extends TopologyProvider<TableHeaderCellProps> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: TableHeaderCellProps) {
    super(props);

    this.className = this.props.classes.tableHeaderCell;
    this.elementType = 'th';
    this.topology = tableHeaderCellTopology;
  }
}

export default withStyles(styles)(TableHeaderCell);

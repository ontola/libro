import { createStyles } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import { TopologyProvider } from 'link-redux';
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
  elementProps?: Record<string, unknown>;
};

class TableHeaderCell extends TopologyProvider<TableHeaderCellProps> {
  constructor(props: TableHeaderCellProps) {
    super(props);

    this.className = this.props.classes.tableHeaderCell;
    this.elementType = 'th';
    this.topology = tableHeaderCellTopology;
  }
}

export default withStyles(styles)(TableHeaderCell);

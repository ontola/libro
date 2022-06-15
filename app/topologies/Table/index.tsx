import { Table, TableContainer } from '@mui/material';
import {
  WithStyles,
  createStyles,
  withStyles, 
} from '@mui/styles';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PropsWithChildren } from 'react';

import { LibroTheme, Margin } from '../../themes/themes';
import { tableTopology } from '../../topologies';

const styles = (theme: LibroTheme) => createStyles({
  table: {
    '& td': {
      '& .fa': {
        color: theme.palette.grey.xxLightForegroundSmall,
      },
      '& [disabled]': {
        '& .fa': {
          color: theme.palette.grey.xLight,
        },
      },
      '& a': {
        margin: '0 .1rem',
      },
    },
    '& tr': {
      '& > *:first-child': {
        paddingLeft: theme.spacing(Margin.Large),
      },
      borderBottom: theme.palette.grey.xLight,
    },
    width: '100%',
  },
  tableWrapper: {
    maxWidth: '100%',
  },
});

type TableProps = PropsWithChildren<WithStyles<typeof styles>>;

class TableClass extends TopologyProvider<TableProps> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: TableProps) {
    super(props);

    this.topology = tableTopology;
  }

  public render() {
    return this.wrap((
      <TableContainer className={this.props.classes.tableWrapper}>
        <Table className={this.props.classes.table}>
          {this.props.children}
        </Table>
      </TableContainer>
    ));
  }
}

export default withStyles(styles)(TableClass);

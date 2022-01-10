import {
  Table,
  TableContainer,
  createStyles, 
} from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PropsWithChildren } from 'react';

import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';

export const tableTopology = argu.ns('table');

const styles = (theme: LibroTheme) => createStyles({
  table: {
    '& tbody': {
      display: 'block',
      maxHeight: '70vh',
      overflowX: 'auto',
    },
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
    '& thead, tr': {
      display: 'table',
      tableLayout: 'fixed',
      width: '100%',
    },
    '& tr': {
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

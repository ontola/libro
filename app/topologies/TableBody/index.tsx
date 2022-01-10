import { TableBody } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PropsWithChildren } from 'react';

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

class TableBodyClass extends TopologyProvider<TableBodyProps> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: TableBodyProps) {
    super(props);

    this.topology = tableBodyTopology;
  }

  public render() {
    const { classes, ...filterProps } = this.props;

    return this.wrap(
      <TableBody
        className={classes.tableBody}
        {...filterProps}
      />,
    );
  }
}

export default withStyles(styles)(TableBodyClass);

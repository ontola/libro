import {
  TableCell,
  WithStyles,
  createStyles,
  withStyles, 
} from '@material-ui/core';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

import { headingCID } from '../../components/Heading';
import argu from '../../ontology/argu';
import { LibroTheme, Margin } from '../../themes/themes';

export const tableCellTopology = argu.ns('tableCell');

const styles = (theme: LibroTheme) => createStyles({
  tableCell: {
    [`& .${headingCID}`]: {
      margin: 0,
      wordBreak: 'normal',
    },
    padding: `${theme.spacing(Margin.Small)} ${theme.spacing(Margin.Small)}`,
    textAlign: 'left',
  },
});

type PropTypes = WithStyles<typeof styles> & {
  children?: ReactNode;
  colspan?: number;
  elementProps?: Record<string, unknown>;
};

class TableCellClass extends TopologyProvider<PropTypes> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: PropTypes) {
    super(props);

    this.topology = tableCellTopology;
  }

  public render() {
    const { classes, ...filterProps } = this.props;

    return this.wrap((
      <TableCell
        className={classes.tableCell}
        {...filterProps}
      />));
  }
}

export default withStyles(styles)(TableCellClass);

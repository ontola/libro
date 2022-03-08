import {
  TableCell,
  TableCellProps,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

import { headingCID } from '../../components/Heading';
import argu from '../../ontology/argu';
import { LibroTheme, Margin } from '../../themes/themes';

export const tableCellTopology = argu.ns('tableCell');

const styles = (theme: LibroTheme) => createStyles({
  noBorder: {
    borderBottom: 'none',
  },
  tableCell: {
    [`& .${headingCID}`]: {
      margin: 0,
      wordBreak: 'normal',
    },
    padding: `${theme.spacing(Margin.Small)} ${theme.spacing(Margin.Small)}`,
  },
});

type PropTypes = WithStyles<typeof styles> & TableCellProps & {
  noBorder?: boolean;
  children?: ReactNode;
  colSpan?: number;
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
    const {
      children,
      classes,
      colSpan,
      noBorder,
    } = this.props;

    const className = clsx({
      [classes.tableCell]: true,
      [classes.noBorder]: noBorder,
    });

    return this.wrap((
      <TableCell
        className={className}
        colSpan={colSpan}
      >
        {children}
      </TableCell>
    ));
  }
}

export default withStyles(styles)(TableCellClass);

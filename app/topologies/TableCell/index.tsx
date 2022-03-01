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
import HeadingContext from '../../components/Heading/HeadingContext';
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
    const { classes, noBorder, ...filterProps } = this.props;

    const className = clsx({
      [classes.tableCell]: true,
      [classes.noBorder]: noBorder,
    });

    return this.wrap((
      <HeadingContext>
        <TableCell
          className={className}
          {...filterProps}
        />
      </HeadingContext>));
  }
}

export default withStyles(styles)(TableCellClass);

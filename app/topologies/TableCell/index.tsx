import { TableCell, TableCellProps } from '@mui/material';
import {
  WithStyles,
  createStyles,
  withStyles, 
} from '@mui/styles';
import clsx from 'clsx';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

import { headingCID } from '../../modules/Common/components/Heading';
import HeadingContext from '../../modules/Common/components/Heading/HeadingContext';
import { LibroTheme, Margin } from '../../themes/themes';
import { tableCellTopology } from '../../topologies';

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
      align,
      classes,
      colSpan,
      noBorder,
      children,
    } = this.props;

    const className = clsx({
      [classes.tableCell]: true,
      [classes.noBorder]: noBorder,
    });

    return this.wrap((
      <HeadingContext>
        <TableCell
          align={align}
          className={className}
          colSpan={colSpan}
        >
          {children}
        </TableCell>
      </HeadingContext>));
  }
}

export default withStyles(styles)(TableCellClass);

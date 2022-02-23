import { TableHead } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PropsWithChildren } from 'react';

import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';

export const tableHeadTopology = argu.ns('tableHead');

const styles = (theme: LibroTheme) => ({
  tableHead: {
    '& button': {
      color: 'inherit',
      cursor: 'pointer',
      font: 'inherit',
    },
    '& tr > th': {
      '&:first-child': {
        borderTopLeftRadius: theme.shape.borderRadius,
      },
      '&:last-child': {
        borderTopRightRadius: theme.shape.borderRadius,
      },
      backgroundColor: theme.palette.grey.xxLight,
    },
    borderBottom: theme.greyBorder,
    color: theme.palette.grey.midDark,
  },
});

type TableHeadProps = PropsWithChildren<WithStyles<typeof styles>>;

class TableHeadClass extends TopologyProvider<TableHeadProps> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: TableHeadProps) {
    super(props);

    this.topology = tableHeadTopology;
  }

  public render() {
    const { classes, ...otherProps } = this.props;

    return this.wrap((
      <TableHead
        className={classes.tableHead}
        {...otherProps}
      />));
  }
}

export default withStyles(styles)(TableHeadClass);

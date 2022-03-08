import { TableRow } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';
import Topology from '../Topology';

export const tableRowTopology = argu.ns('tableRow');

const styles = (theme: LibroTheme) => ({
  tableRowClickable: {
    '&:hover': {
      background: theme.palette.grey.xxLight,
      cursor: 'pointer',
    },
  },
});

type TableRowElementProps = { onClick: any; };
type TableRowProps = WithStyles<typeof styles> & TableRowElementProps;

class TableRowClass extends Topology<TableRowProps> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  };

  constructor(props: TableRowProps) {
    super(props);

    this.className = this.getClassName();
    this.elementType = 'tr';
    this.topology = tableRowTopology;
  }

  public getElementProps(): TableRowElementProps {
    return {
      onClick: this.props.onClick,
    };
  }

  public render() {
    const { classes, children } = this.props;

    return this.wrap((subject) => (
      <TableRow
        className={clsx({
          [classes.tableRowClickable]: !!this.props.onClick,
        })}
        resource={subject && subject.value}
      >
        {children}
      </TableRow>
    ));
  }
}

export default withStyles(styles)(TableRowClass);

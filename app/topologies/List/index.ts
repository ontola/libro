import {
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/styles';
import clsx from 'clsx';

import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';
import Topology from '../Topology';

export enum ListDirection {
  Column = 'column',
}

const BOTTOM_GUTTER_SPACING = 10;

interface ListProps extends WithStyles<typeof styles> {
  direction?: ListDirection;
  gutter?: boolean;
  overflow?: boolean;
  wrap?: boolean;
}

export const listTopology = argu.ns('list');

const styles = (theme: LibroTheme) => createStyles({
  column: {
    flexDirection: 'column',
  },
  gutter: {
    marginBottom: theme.spacing(BOTTOM_GUTTER_SPACING),
  },
  list: {
    display: 'flex',
  },
  overflow: {
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  wrap: {
    flexWrap: 'wrap',
  },
});

/**
 * Sets the List topology
 * @returns {component} Component
 */
class List extends Topology<ListProps> {
  constructor(props: ListProps) {
    super(props);

    this.topology = listTopology;
  }

  public getClassName(): string {
    return clsx({
      [this.props.classes.list]: true,
      [this.props.classes.gutter]: this.props.gutter,
      [this.props.classes.column]: this.props.direction === ListDirection.Column,
      [this.props.classes.overflow]: this.props.overflow,
      [this.props.classes.wrap]: this.props.wrap,
    });
  }
}

export default withStyles(styles)(List);

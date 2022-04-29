import {
  WithStyles,
  createStyles,
  withStyles,
} from '@mui/styles';
import clsx from 'clsx';

import { listTopology } from '../../topologies';
import Topology from '../Topology';

export enum ListDirection {
  Column = 'column',
}

interface ListProps extends WithStyles<typeof styles> {
  direction?: ListDirection;
  overflow?: boolean;
  wrap?: boolean;
}

const styles = () => createStyles({
  column: {
    flexDirection: 'column',
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
      [this.props.classes.column]: this.props.direction === ListDirection.Column,
      [this.props.classes.overflow]: this.props.overflow,
      [this.props.classes.wrap]: this.props.wrap,
    });
  }
}

export default withStyles(styles)(List);

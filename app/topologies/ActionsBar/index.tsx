import {
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/styles';
import clsx from 'clsx';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { loadingButtonCID } from '../../components/Loading';
import { actionsBarTopology } from '../../topologies';

type PropTypes = WithStyles<typeof styles> & {
  small?: boolean;
};

const styles = createStyles({
  actionsBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    height: '100%',
  },
  small: {
    '& .Link': {
      color: 'var(--accent-background-color)',
    },
    [`& .${loadingButtonCID}`]: {
      flexGrow: 'unset',
      margin: 0,
      width: '8em',
    },
    '& > *': {
      transform: 'scale(.8)',
    },
    flexDirection: 'row-reverse',
  },
});

class ActionsBar extends TopologyProvider<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.className = 'ActionsBar';
    this.topology = actionsBarTopology;
  }

  public render() {
    const classes = clsx({
      [this.props.classes.actionsBar]: true,
      [this.props.classes.small]: this.props.small,
    });

    if (this.props.children === undefined) {
      return null;
    }

    return this.wrap((
      <div className={classes}>
        {this.props.children}
      </div>
    ));
  }
}

export default withStyles(styles)(ActionsBar);

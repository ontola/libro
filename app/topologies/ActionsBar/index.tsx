import {
  ClassNameMap,
  createStyles,
  withStyles,
} from '@material-ui/styles';
import clsx from 'clsx';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';

export const actionsBarTopology = argu.actionsBar;

interface PropTypes {
  small?: boolean;
  classes?: ClassNameMap<'small' | 'actionBar'>
}

const styles = createStyles({
  actionBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    height: '100%',
  },
  small: {
    '& .Link': {
      color: 'var(--accent-background-color)',
    },
    '& .Loading__Button': {
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
      [this.props.classes!.actionBar]: true,
      [this.props.classes!.small]: this.props.small,
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

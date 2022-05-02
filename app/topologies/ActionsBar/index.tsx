import {
  WithStyles,
  createStyles,
  withStyles,
} from '@mui/styles';
import clsx from 'clsx';
import { TopologyProvider } from 'link-redux';
import React from 'react';

import { loadingButtonCID } from '../../components/Loading';
import { actionsBarTopology } from '../../topologies';

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

interface ActionsBarProps extends React.PropsWithChildren<WithStyles<typeof styles>> {
  small?: boolean;
}

class ActionsBar extends TopologyProvider<ActionsBarProps> {
  constructor(props: ActionsBarProps) {
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

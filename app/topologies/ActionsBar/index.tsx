import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import { useTopologyProvider } from 'link-redux';

import { loadingButtonCID } from '../../modules/Core/components/Loading';
import { actionsBarTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

interface ActionsBarProps {
  small?: boolean;
}

const useStyles = makeStyles({
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

const ActionsBar: TopologyFC<ActionsBarProps> = ({ children, small }) => {
  const [ActionsBarTopology] = useTopologyProvider(actionsBarTopology);
  const classes = useStyles();

  const className = clsx({
    [classes.actionsBar]: true,
    [classes.small]: small,
  });

  if (children === undefined) {
    return null;
  }

  return (
    <ActionsBarTopology>
      <div className={className}>
        {children}
      </div>
    </ActionsBarTopology>
  );
};

export default ActionsBar;

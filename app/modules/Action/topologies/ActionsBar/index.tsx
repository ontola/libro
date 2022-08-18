import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { loadingButtonCID } from '../../../Common/components/Loading';
import { actionsBarTopology } from '../index';

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

const ActionsBarTopology = createTopologyProvider(actionsBarTopology);

const ActionsBar: TopologyFC<ActionsBarProps> = ({ children, small }) => {
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

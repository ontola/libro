import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { loadingButtonCID } from '../../../Core/components/Loading';
import { TopologyFC } from '../../../Core/lib/topology';
import libro from '../../../Core/ontology/libro';

export const actionsBarTopology = libro.topologies.actionsBar;

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

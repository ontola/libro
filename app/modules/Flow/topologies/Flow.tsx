import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import { useTopologyProvider } from 'link-redux';

import { flowTopology } from '../../../topologies';
import { TopologyFC } from '../../../topologies/Topology';

export type FlowProps = Record<string, unknown> & {
  className?: string;
  children: React.ReactNode;
};

const useStyles = makeStyles(() => createStyles({
  root: {
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    width: '100vw',
  },
}));

const Flow: TopologyFC<FlowProps> = ({ children }) => {
  const [FlowTopology] = useTopologyProvider(flowTopology);
  const classes = useStyles();

  return (
    <FlowTopology>
      <div className={classes.root}>
        {children}
      </div>
    </FlowTopology>
  );
};

export default Flow;

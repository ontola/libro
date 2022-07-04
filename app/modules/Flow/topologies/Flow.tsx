import { createStyles, makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../Kernel/lib/topology';
import libro from '../../Kernel/ontology/libro';

export const flowTopology = libro.topologies.flow;

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

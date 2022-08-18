import { createStyles, makeStyles } from '@mui/styles';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { flowTopology } from './index';

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

const FlowTopology = createTopologyProvider(flowTopology);

const Flow: TopologyFC<FlowProps> = ({ children }) => {
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

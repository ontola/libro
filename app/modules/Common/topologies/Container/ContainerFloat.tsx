import { makeStyles } from '@mui/styles';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { containerFloatTopology } from '../index';

const useStyles = makeStyles({
  containerFloat: {
    alignItems: 'center',
    display: 'flex',
  },
});

const ContainerFloatTopology = createTopologyProvider(containerFloatTopology);

/**
 * In the top right corner of a container
 * Sets the containerFloat topology
 */
const ContainerFloat: TopologyFC = ({ children }) => {
  const classes = useStyles();

  return (
    <ContainerFloatTopology>
      <div className={classes.containerFloat}>
        {children}
      </div>
    </ContainerFloatTopology>
  );
};

export default ContainerFloat;

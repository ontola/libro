import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Core/lib/topology';
import libro from '../../../Core/ontology/libro';

export const containerFloatTopology = libro.topologies.containerFloat;

const useStyles = makeStyles({
  containerFloat: {
    alignItems: 'center',
    display: 'flex',
  },
});

/**
 * In the top right corner of a container
 * Sets the containerFloat topology
 */
const ContainerFloat: TopologyFC = ({ children }) => {
  const [ContainerFloatTopology] = useTopologyProvider(containerFloatTopology);
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

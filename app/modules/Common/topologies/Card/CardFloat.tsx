import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Core/lib/topology';
import libro from '../../../Core/ontology/libro';

export const cardFloatTopology = libro.topologies.cardFloat;

const useStyles = makeStyles({
  cardFloat: {
    alignItems: 'center',
    display: 'flex',
  },
});

/**
 * In the top right corner of a card
 * Sets the cardFloat topology
 */
const CardFloat: TopologyFC = ({ children }) => {
  const [CardFloatTopology] = useTopologyProvider(cardFloatTopology);
  const classes = useStyles();

  return (
    <CardFloatTopology>
      <div className={classes.cardFloat}>
        {children}
      </div>
    </CardFloatTopology>
  );
};

export default CardFloat;

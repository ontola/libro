import { makeStyles } from '@mui/styles';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { cardFloatTopology } from '../index';

const useStyles = makeStyles({
  cardFloat: {
    alignItems: 'center',
    display: 'flex',
  },
});

const CardFloatTopology = createTopologyProvider(cardFloatTopology);

/**
 * In the top right corner of a card
 * Sets the cardFloat topology
 */
const CardFloat: TopologyFC = ({ children }) => {
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

import { makeStyles } from '@material-ui/styles';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import elements from '../../ontology/elements';
import { allTopologies } from '../../topologies';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    justifyItems: 'center',
  },
});

const ElementsGrid: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.grid}>
      <Property label={elements.children} />
    </div>
  );
};

ElementsGrid.type = elements.Grid;
ElementsGrid.topology = allTopologies;

export default register(ElementsGrid);

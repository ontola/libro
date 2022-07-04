import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  array,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../topologies';
import { BreakPoints, LibroTheme } from '../../../Kernel/lib/themes';
import sales from '../../ontology/sales';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  container: {
    alignItems: 'stretch',
  },
  image: {
    padding: 20,
    width: 'clamp(100px, 30vw, 300px)',
  },
  imageWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      flexDirection: 'row',
    },
  },
}));

const Stepper: FC = () => {
  const classes = useStyles();
  const images = useIds(array(schema.image));

  return (
    <Grid
      container
      alignItems="center"
      className={classes.container}
      direction="row"
      justifyContent="center"
    >
      <Grid
        item
        md={8}
        sm={12}
      >
        <Property label={sales.steps} />
      </Grid>
      <Grid
        item
        className={classes.imageWrapper}
        md={4}
        sm={12}
      >
        {images.map((image) => (
          <Resource
            className={classes.image}
            key={image.value}
            subject={image}
          />
        ))}
      </Grid>
    </Grid>
  );
};

Stepper.type = sales.Stepper;

Stepper.topology = allTopologies;

export default register(Stepper);

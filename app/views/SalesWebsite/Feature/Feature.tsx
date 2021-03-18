import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { showcaseTopology } from '../../../topologies/Showcase';

const useStyles = makeStyles({
  container: {
    marginTop: 75,
  },
  header: {
    fontWeight: 'bold',
  },
  icon: {
    color: (props: Record<string, string>) => props.color,
    fontSize: 50,
  },
  image: {
    color: 'yellow',
    height: 44,
  },
  subtitle: {
    textAlign: 'center',
  },
});

const Feature: FC = () => {
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [color] = useProperty(schema.color);
  const classes = useStyles({ color: color.value });

  return (
    <Grid
      container
      alignItems="center"
      className={classes.container}
      direction="column"
      justify="center"
      lg={3}
      md={6}
      sm={12}
    >
      <div className={classes.icon}>
        <Property label={schema.image} />
      </div>
      <Typography className={classes.header} variant="h6">{name.value}</Typography>
      <Typography className={classes.subtitle} variant="h6">{text.value}</Typography>
    </Grid>
  );
};

Feature.type = argu.ns('FeatureIcon');

Feature.topology = showcaseTopology;

export default Feature;

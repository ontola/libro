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
  header: {
    color: (props: Record<string, string>) => props.textColor,
    fontWeight: 'bold',
  },
  icon: {
    color: (props: Record<string, string>) => props.color,
    fontSize: 70,
    margin: 30,
  },
  image: {
    color: 'yellow',
    height: 44,
  },
  subtitle: {
    color: (props: Record<string, string>) => props.textColor,
    textAlign: 'center',
  },
});

const Feature: FC = () => {
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [color] = useProperty(schema.color);
  const [textColor] = useProperty(argu.ns('textColor'));
  const classes = useStyles({
    color: color.value,
    textColor: textColor.value,
  });

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justify="center"
      md={3}
      sm={6}
      xs={12}
    >
      <div className={classes.icon}>
        <Property label={schema.image} />
      </div>
      <Typography
        className={classes.header}
        variant="h6"
      >
        {name.value}
      </Typography>
      <Typography
        className={classes.subtitle}
        variant="h6"
      >
        {text.value}
      </Typography>
    </Grid>
  );
};

Feature.type = argu.ns('FeatureIcon');

Feature.topology = showcaseTopology;

export default Feature;

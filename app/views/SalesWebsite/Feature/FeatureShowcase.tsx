import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  useProperty,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import Image from '../../../components/Image';
import { showcaseTopology } from '../../../topologies/Showcase';

const useStyles = makeStyles({
  container: {
    backgroundColor: 'white',
    borderColor: '000',
    borderWidth: 1,
    boxShadow: '0 0 25px rgba(0,0,0,0.2)',
    display: 'flex',
    marginBottom: 20,
    marginTop: 20,
    paddingTop: 20,
  },
  icon: {
    fontSize: 70,
    textAlign: 'center',
  },
  image: {
    color: 'yellow',
    height: 44,
  },
  subtitle: {
    fontSize: '1.125rem',
    lineHeight: '1.7rem',
    margin: 10,
    marginBottom: 24,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Feature: FC = () => {
  const classes = useStyles();
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [image] = useProperty(schema.image);

  return (
    <Grid
      container
      className={classes.container}
      direction="column"
      justify="flex-start"
    >
      <Image linkedProp={image} />
      <Typography
        className={classes.title}
        variant="h3"
      >
        {name.value}
      </Typography>
      <Typography
        className={classes.subtitle}
        variant="body1"
      >
        {text.value}
      </Typography>
    </Grid>
  );
};

Feature.type = sales.Feature;

Feature.topology = showcaseTopology;

export default Feature;

import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  useProperty,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { showcaseTopology } from '../../../topologies/Showcase';
import Image from '../../../components/Image';

const useStyles = makeStyles({
  container: {
    backgroundColor: 'FFF',
    borderColor: '000',
    borderWidth: 1,
    boxShadow: '0 0 25px rgba(0,0,0,0.2)',
    display: 'flex',
    marginBottom: 20,
    marginTop: 20,
    paddingTop: 20,
  },
  icon: {
    color: (props: Record<string, string>) => props.color,
    fontSize: 70,
    textAlign: 'center',
  },
  image: {
    color: 'yellow',
    height: 44,
  },
  subtitle: {
    color: (props: Record<string, string>) => props.textColor,
    fontSize: '1.125rem',
    lineHeight: '1.7rem',
    margin: 10,
    marginBottom: 24,
    textAlign: 'center',
  },
  title: {
    color: (props: Record<string, string>) => props.textColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Functionality: FC = () => {
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [color] = useProperty(schema.color);
  const [image] = useProperty(schema.image);
  const [textColor] = useProperty(argu.ns('textColor'));
  const classes = useStyles({
    color: color.value,
    textColor: textColor.value,
  });

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

Functionality.type = argu.ns('Functionality');

Functionality.topology = showcaseTopology;

export default Functionality;

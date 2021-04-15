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
import sales from '../../../ontology/sales';
import { showcaseTopology } from '../../../topologies/Showcase';

const useStyles = makeStyles({
  container: {
    marginBottom: 20,
    marginTop: 20,
  },
  icon: {
    color: (props: Record<string, string>) => props.color,
    fontSize: 70,
    margin: 30,
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

const FeatureIconShowcase: FC = () => {
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
      item
      className={classes.container}
      md={3}
      sm={6}
      xs={12}
    >
      <div className={classes.icon}>
        <Property label={schema.image} />
      </div>
      <Typography
        className={classes.title}
        variant="h3"
      >
        {name.value}
      </Typography>
      <div
        className={classes.subtitle}
        dangerouslySetInnerHTML={{ __html: text.value }}
      />
    </Grid>
  );
};

FeatureIconShowcase.type = sales.FeatureIcon;

FeatureIconShowcase.topology = showcaseTopology;

export default FeatureIconShowcase;

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
    backgroundColor: '#FFFFFF',
    borderColor: 'grey',
    borderRadius: 5,
    marginTop: 50,
    padding: '0 30px',
    width: '24%',
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

const FeatureIcon: FC = () => {
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
    >
      <div className={classes.icon}>
        <Property label={schema.image} />
      </div>
      <Typography className={classes.header} variant="h6">{name.value}</Typography>
      <Typography className={classes.subtitle} variant="h6">{text.value}</Typography>
    </Grid>
  );
};

FeatureIcon.type = argu.ns('FeatureIcon');

FeatureIcon.topology = showcaseTopology;

export default FeatureIcon;

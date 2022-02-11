import {
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { allTopologies } from '../../../topologies';

const useStyles = makeStyles({
  flexBox: {
    '& picture': {
      '& img':{
        borderRadius: '15px',
        height: 'auto',
        width: '100%',
      },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: '40% !important',
    },
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '3rem',
  },
  mobile: {
    '& img':{
      borderRadius: '15px',
      marginBottom: '24px',
      maxHeight: '40vh',
    },
    padding: '1rem',
  },
  text: {
    '& h2': {
      margin: 0,

    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '50%',
  },
});

const FeatureBlock: FC = () => {
  const [image] = useProperty(schema.image);
  const [direction] = useProperty(sales.direction);
  const classes = useStyles();
  const [name] = useProperty(schema.name);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const reverse = (direction.value === 'reverse');

  const featureBlockHeading = (
    <Typography
      variant="h2"
    >
      {name.value}
    </Typography>
  );

  const featureBlockImage = (
    <Resource subject={image} />
  );

  if (mobile) {
    return (
      <div className={classes.mobile}>
        {featureBlockHeading}
        {featureBlockImage}
        <Property label={schema.text} />
      </div>
    );
  }

  return (
    <div className={classes.flexBox}>
      {reverse ? null : featureBlockImage}
      <div className={classes.text}>
        {featureBlockHeading}
        <Property label={schema.text} />
      </div>
      {reverse ? featureBlockImage : null}
    </div>
  );
};

FeatureBlock.type = sales.FeatureBlock;

FeatureBlock.topology = allTopologies;

export default register(FeatureBlock);
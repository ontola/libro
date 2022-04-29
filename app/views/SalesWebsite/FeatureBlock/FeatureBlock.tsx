import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  FC,
  Property,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import elements from '../../../ontology/elements';
import sales from '../../../ontology/sales';
import { LibroTheme, Margin } from '../../../themes/themes';
import { allTopologies } from '../../../topologies';

interface StyleProps {
  reverse: boolean;
}

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  centered: {},
  featureBlock: {
    [theme.breakpoints.down('sm')]: {
      '&&&': {
        gridTemplateAreas: '"title" "image" "text"',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto auto auto',
      },
    },
    '&$centered': {
      gridTemplateRows: '1fr 1fr',
    },
    columnGap: theme.spacing(Margin.Medium),
    display: 'grid',
    gridTemplateAreas: ({ reverse }) => !reverse ?
      '"image title" "image text"' :
      '"title image" "text image"',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto 1fr',
  },
  image: {
    '& img': {
      borderRadius: theme.shape.borderRadius,
    },
    gridArea: 'image',
  },
  text: {
    gridArea: 'text',
  },
  title: {
    '&$centered': {
      alignSelf: 'end',
    },
    gridArea: 'title',
  },
}));

const FeatureBlock: FC = () => {
  const [direction] = useStrings(sales.direction);
  const [alignment] = useStrings(elements.align);
  const reverse = (direction === 'reverse');
  const classes = useStyles({ reverse });
  const [name] = useStrings(schema.name);

  const addCenter = (className: string) => clsx({
    [className]: true,
    [classes.centered]: alignment === 'center',
  });

  return (
    <div className={addCenter(classes.featureBlock)}>
      <Typography
        className={addCenter(classes.title)}
        variant="h2"
      >
        {name}
      </Typography>
      <div className={classes.image}>
        <Property label={schema.image} />
      </div>
      <div className={classes.text}>
        <Property label={schema.text} />
      </div>
    </div>
  );
};

FeatureBlock.type = sales.FeatureBlock;

FeatureBlock.topology = allTopologies;

export default register(FeatureBlock);

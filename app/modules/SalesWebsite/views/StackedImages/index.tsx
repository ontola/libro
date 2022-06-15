import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  array,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import sales from '../../ontology/sales';
import { LibroTheme } from '../../../../themes/themes';
import { allTopologies } from '../../../../topologies';

interface StyleProps {
  count: number;
}

const TEN = 10;
const OffsetModifier = -5;

const imageWidthModifier = (imageCount: number) => imageCount / TEN + 1;

const imageOffset = (imageCount: number) => `${imageCount * OffsetModifier}%`;

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  wrapper: {
    '& img': {
      backgroundColor: theme.palette.background.default,
      clipPath: 'circle(50%)',
      marginLeft: ({ count }) => imageOffset(count),
      padding: '3px',
      width: ({ count }) => `calc(var(--container-size) * ${imageWidthModifier(count)})`,
    },
    '--container-size': 'min(100%, 11rem)',
    display: 'flex',
    width: 'var(--container-size)',
  },
}));

const StackedImages: FC = () => {
  const images = useIds(array(schema.image));
  const classes = useStyles({ count: images.length });

  return (
    <div className={classes.wrapper}>
      {images.map((image) => (
        <Resource
          key={image.value}
          subject={image}
        />
      ))}
    </div>
  );
};

StackedImages.type = sales.StackedImages;
StackedImages.topology = allTopologies;

export default register(StackedImages);

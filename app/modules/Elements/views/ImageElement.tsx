import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { BreakPoints, LibroTheme } from '../../Common/theme/types';
import { allTopologies } from '../../../topologies';
import Image from '../../Common/components/Image';
import ontola from '../../Core/ontology/ontola';
import elements from '../ontology/elements';

interface StyleProps {
  float?: string,
}

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  float: {
    [theme.breakpoints.up(BreakPoints.Small)]: {
      float: ({ float }) => float,
      maxWidth: '50% !Important',
      padding: '10px',
    },
  },
  img: {
    height: 'auto',
    maxWidth: '100%',
  },
}));

const ImageElement: FC = () => {
  const [float] = useProperty(elements.float);
  const [href] = useProperty(ontola.href);
  const classes = useStyles({ float: float?.value });

  const imageClasses = clsx({
    [classes.img]: true,
    [classes.float]: float?.value,
  });

  if (href) {
    return (
      <Image
        className={imageClasses}
        linkedProp={href}
      />
    );
  }

  return (
    <Property
      className={imageClasses}
      label={schema.image}
    />
  );
};

ImageElement.type = elements.Img;
ImageElement.topology = allTopologies;

export default register(ImageElement);

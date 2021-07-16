import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import { FloatProperty } from 'csstype';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Image from '../../components/Image';
import elements from '../../ontology/elements';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

interface StyleProps {
  float?: string,
}

const useStyles = makeStyles<undefined, StyleProps>({
  float: {
    marginLeft: ({ float }) => float === 'left' ? 'var(--article-image-inset, 10%)' : 'inherit',
    marginRight: ({ float }) => float === 'right' ? 'var(--article-image-inset, 10%)' : 'inherit',
    maxWidth: '40% !Important',
    padding: '10px',
  },
  img: {
    float: ({ float }) => float as FloatProperty ?? 'unset',
    height: 'auto',
    maxWidth: '100%',
  },
});

const ImageElement: FC = () => {
  const [float] = useProperty(elements.float);
  const [href] = useProperty(ontola.href);
  const classes = useStyles({ float: float?.value });

  const imageClasses = clsx({
    [classes.img]: true,
    [classes.float]: float?.value,
  });

  if (href) {
    return <Image className={imageClasses} linkedProp={href} />;
  }

  return (
    <Property className={imageClasses} label={schema.image} />
  );
};

ImageElement.type = elements.Img;
ImageElement.topology = allTopologies;

export default register(ImageElement);

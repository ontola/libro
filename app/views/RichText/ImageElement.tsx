import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Image from '../../components/Image';
import { allTopologies } from '../../topologies';
import ontola from '../../ontology/ontola';
import elements from '../../ontology/elements';

const useStyles = makeStyles({
  img: {
    height: 'auto',
    maxWidth: '100%',
  },
});

const ImageElement: FC = () => {
  const className = useStyles();
  const [href] = useProperty(ontola.href);

  return <Image className={className.img} linkedProp={href} />;
};

ImageElement.type = elements.Img;
ImageElement.topology = allTopologies;

export default register(ImageElement);

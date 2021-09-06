import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { cardMainTopology } from '../../topologies/Card/CardMain';
import { footerTopology } from '../../topologies/Footer';

const ImageObjectCardContent: FC = () => {
  const [contentUrl] = useProperty(schema.contentUrl);

  return (
    <img
      alt=""
      data-test="ImageObject-image"
      src={contentUrl?.value}
    />
  );
};

ImageObjectCardContent.type = [
  schema.ImageObject,
];

ImageObjectCardContent.topology = [
  cardMainTopology,
  footerTopology,
];

export default register(ImageObjectCardContent);

import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
  useStrings,
} from 'link-redux';
import React from 'react';

import { cardMainTopology, footerTopology } from '../../../../topologies';

const ImageObjectCardMain: FC = () => {
  const [ariaLabel] = useStrings([schema.description, schema.caption]);
  const [contentUrl] = useProperty(schema.contentUrl);

  return (
    <img
      aria-label={ariaLabel}
      data-test="ImageObject-image"
      src={contentUrl?.value}
    />
  );
};

ImageObjectCardMain.type = [
  schema.ImageObject,
];

ImageObjectCardMain.topology = [
  cardMainTopology,
  footerTopology,
];

export default register(ImageObjectCardMain);

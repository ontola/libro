import * as schema from '@ontologies/schema';
import { register, useValues } from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import { PageHeaderImage, pageHeaderTopology } from '../../topologies/PageHeader';

const ImageObjectPageHeader = () => {
  const [description] = useValues(schema.description);
  const [imgUrl256x256] = useValues(ontola.imgUrl256x256);

  return (
    <PageHeaderImage
      alt={description}
      src={imgUrl256x256}
    />
  );
};

ImageObjectPageHeader.type = schema.ImageObject;

ImageObjectPageHeader.topology = pageHeaderTopology;

export default register(ImageObjectPageHeader);

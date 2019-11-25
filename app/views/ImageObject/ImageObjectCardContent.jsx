import schema from '@ontologies/schema';
import { linkType, register } from 'link-redux';
import React from 'react';

import { cardMainTopology } from '../../topologies/Card/CardMain';

const ImageObjectCardContent = ({ contentUrl }) => <img data-test="ImageObject-image" src={contentUrl?.value} />;

ImageObjectCardContent.type = [
  schema.ImageObject,
];

ImageObjectCardContent.topology = cardMainTopology;

ImageObjectCardContent.mapDataToProps = {
  contentUrl: schema.contentUrl,
};

ImageObjectCardContent.propTypes = {
  contentUrl: linkType,
};

export default register(ImageObjectCardContent);

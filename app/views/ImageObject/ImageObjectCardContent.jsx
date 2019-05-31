import { linkType, register } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { cardMainTopology } from '../../topologies/Card/CardMain';

const ImageObjectCardContent = ({ contentUrl }) => <img data-test="ImageObject-image" src={contentUrl?.value} />;

ImageObjectCardContent.type = [
  NS.schema('ImageObject'),
];

ImageObjectCardContent.topology = cardMainTopology;

ImageObjectCardContent.mapDataToProps = {
  contentUrl: NS.schema('contentUrl'),
};

ImageObjectCardContent.propTypes = {
  contentUrl: linkType,
};

export default register(ImageObjectCardContent);

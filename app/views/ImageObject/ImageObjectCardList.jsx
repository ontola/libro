import schema from '@ontologies/schema';
import {
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import AttachmentPreview from '../../components/AttachmentPreview';
import dbo from '../../ontology/dbo';
import { cardListTopology } from '../../topologies/Card/CardList';

const ImageObjectCardList = ({
  caption,
  contentUrl,
  filename,
  isPartOf,
  sequenceIndex,
  thumbnailUrl,
}) => (
  <AttachmentPreview
    caption={caption}
    filename={filename}
    isPartOf={isPartOf}
    sequenceIndex={sequenceIndex}
    thumbnailURL={thumbnailUrl || contentUrl}
  />
);

ImageObjectCardList.type = [schema.ImageObject, schema.VideoObject];

ImageObjectCardList.topology = cardListTopology;

ImageObjectCardList.mapDataToProps = {
  caption: schema.caption,
  contentUrl: schema.contentUrl,
  filename: dbo.filename,
  isPartOf: schema.isPartOf,
  thumbnailUrl: schema.thumbnail,
};

ImageObjectCardList.propTypes = {
  caption: linkType,
  contentUrl: linkType,
  filename: linkType,
  isPartOf: linkType,
  sequenceIndex: PropTypes.number,
  thumbnailUrl: linkType,
};

export default register(ImageObjectCardList);

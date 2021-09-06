import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { BlankNode } from '@ontologies/shacl';

import AttachmentPreview from '../../components/AttachmentPreview';
import dbo from '../../ontology/dbo';
import { cardListTopology } from '../../topologies/Card/CardList';

interface ImageObjectCardListProps {
  sequenceIndex: number;
}

const ImageObjectCardList: FC<ImageObjectCardListProps> = ({ sequenceIndex }) => {
  const [caption] = useProperty(schema.caption);
  const [contentUrl] = useProperty(schema.contentUrl);
  const [filename] = useProperty(dbo.filename);
  const [isPartOf] = useProperty(schema.isPartOf) as NamedNode[];
  const [thumbnailUrl] = useProperty(schema.thumbnail);
  
  return (
    <AttachmentPreview
      caption={caption}
      // contentURL does not get used when isDocument={false}
      contentUrl={BlankNode}
      filename={filename}
      isDocument={false}
      isPartOf={isPartOf}
      sequenceIndex={sequenceIndex}
      thumbnailURL={thumbnailUrl ?? contentUrl}
    />
  );
};

ImageObjectCardList.type = [schema.ImageObject, schema.VideoObject];

ImageObjectCardList.topology = cardListTopology;

export default register(ImageObjectCardList);

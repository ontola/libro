import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { DocumentAttachmentPreview } from '../../components/AttachmentPreview/DocumentAttachmentPreview';
import { imageRepresentationUrl } from '../../helpers/attachments';
import dbo from '../../ontology/dbo';
import { chapterContentToplogy } from '../../topologies/ChapterContent';

const emptyClickHandler = () => null;

const MediaObjectChapterContent: FC = () => {
  const [caption] = useProperty(schema.caption);
  const [contentUrl] = useProperty(schema.contentUrl);
  const [encodingFormat] = useProperty(schema.encodingFormat) as Literal[];
  const [filename] = useProperty(dbo.filename);

  return (
    <DocumentAttachmentPreview
      downloadURL={contentUrl.value}
      label={caption?.value ?? filename?.value}
      showPreviewDialog={false}
      thumbnailURL={imageRepresentationUrl({ encodingFormat })}
      onPreviewClick={emptyClickHandler}
    />
  );
};

MediaObjectChapterContent.type = schema.MediaObject;

MediaObjectChapterContent.topology = chapterContentToplogy;

export default register(MediaObjectChapterContent);

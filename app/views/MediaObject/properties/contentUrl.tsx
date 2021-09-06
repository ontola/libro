import { Literal, NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import AnnotatedPDFViewer from '../../../components/AnnotatedPDFViewer';
import Image from '../../../components/Image';
import {
  downloadUrl,
  imageRepresentationUrl,
  isPDF,
} from '../../../helpers/attachments';
import dbo from '../../../ontology/dbo';
import { allTopologies } from '../../../topologies';

interface PropTypes {
  encodingFormat: Literal;
  filename: NamedNode;
  linkedProp: NamedNode;
}

const ContentUrl: FC<PropTypes> = ({
  linkedProp,
  subject,
}) => {
  const [encodingFormat] = useProperty([schema.encodingFormat, schema.fileFormat]) as Literal[];
  const [filename] = useProperty(dbo.filename);

  if (isPDF(encodingFormat, linkedProp)) {
    return (
      <AnnotatedPDFViewer
        subject={subject}
        url={linkedProp.value}
      />
    );
  }

  const imageLink = encodingFormat?.value?.startsWith('image/')
    ? linkedProp
    : imageRepresentationUrl({ encodingFormat });

  return (
    <a
      href={downloadUrl(linkedProp)}
      rel="nofollow noindex"
      title="Downloaden"
    >
      <Image
        ariaLabel={filename && filename.value}
        className="MediaObjectPage__infobar--image"
        data-test="MediaObject-viewer-image"
        linkedProp={imageLink}
      />
      {filename && (
        <p className="MediaObjectPage__infobar--image--filename">
          {filename.value}
        </p>
      )}
    </a>
  );
};

ContentUrl.type = [
  schema.MediaObject,
  schema.ImageObject,
];

ContentUrl.property = schema.contentUrl;

ContentUrl.topology = allTopologies;

export default register(ContentUrl);

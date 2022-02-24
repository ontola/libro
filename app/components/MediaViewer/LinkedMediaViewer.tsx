import * as schema from '@ontologies/schema';
import {
  useGlobalIds,
  useNumbers,
  useStrings,
} from 'link-redux';
import React from 'react';

import dbo from '../../ontology/dbo';

import MediaViewer from './MediaViewer';

export interface LinkedMediaViewer {
  downloadSection?: boolean;
}

const LinkedMediaViewer = ({
  downloadSection,
}: LinkedMediaViewer): JSX.Element | null => {
  const [encodingFormat] = useStrings([schema.encodingFormat, schema.fileFormat]);
  const [filename] = useStrings(dbo.filename);
  const [contentUrl] = useGlobalIds(schema.contentUrl);
  const [contentSize] = useNumbers(schema.contentSize);
  const [embedUrl] = useStrings(schema.embedUrl);

  if (!contentUrl) {
    return null;
  }

  return (
    <MediaViewer
      contentSize={contentSize}
      contentUrl={contentUrl?.value}
      downloadSection={downloadSection}
      embedUrl={embedUrl}
      encodingFormat={encodingFormat}
      filename={filename}
    />
  );
};

export default LinkedMediaViewer;

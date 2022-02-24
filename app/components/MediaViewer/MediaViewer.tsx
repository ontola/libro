import React from 'react';

import SheetViewer from '../../containers/SheetViewer';
import {
  isPDF,
  isSheet,
} from '../../helpers/attachments';
import AnnotatedPDFViewer from '../AnnotatedPDFViewer';

import ImageViewer from './ImageViewer';
import VideoViewer from './VideoViewer';

export interface MediaViewerProps {
  contentUrl: string;
  contentSize?: number;
  downloadSection?: boolean;
  embedUrl?: string;
  encodingFormat?: string;
  filename?: string;
}

const MediaViewer = (props: MediaViewerProps): JSX.Element | null => {
  const {
    contentUrl,
    embedUrl,
    encodingFormat,
  } = props;

  if (!contentUrl) {
    return null;
  }

  if (embedUrl) {
    return <VideoViewer {...props} />;
  }

  if (isPDF(encodingFormat, contentUrl)) {
    return <AnnotatedPDFViewer {...props} />;
  }

  if (isSheet(contentUrl, encodingFormat)) {
    return <SheetViewer {...props} />;
  }

  return <ImageViewer {...props} />;
};

export default MediaViewer;

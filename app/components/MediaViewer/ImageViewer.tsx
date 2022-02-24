import { makeStyles } from '@material-ui/core/styles';
import rdf from '@ontologies/core';
import React from 'react';

import { downloadUrl, imageRepresentationUrl } from '../../helpers/attachments';
import Image from '../Image';

import DownloadSection from './DownloadSection';
import { MediaViewerProps } from './MediaViewer';

const useStyles = makeStyles(() => ({
  mediaObjectPageInfoBarImage: {
    '&.fa': {
      fontSize: '10em',
    },
    display: 'block',
    margin: 'auto',
    maxWidth: '100%',
    textAlign: 'center',
  },

  mediaObjectPageInfoBarImageFilename: {
    textAlign: 'center',
  },
}));

const ImageViewer = (props: MediaViewerProps): JSX.Element => {
  const {
    contentUrl,
    downloadSection,
    encodingFormat,
    filename,
  } = props;
  const classes = useStyles();
  const imageLink = encodingFormat?.startsWith('image/')
    ? rdf.literal(contentUrl)
    : imageRepresentationUrl({ encodingFormat });

  return (
    <React.Fragment>
      {downloadSection && <DownloadSection {...props} />}
      <a
        href={downloadUrl(contentUrl)}
        rel="nofollow noindex"
        title="Downloaden"
      >
        <Image
          ariaLabel={filename}
          className={classes.mediaObjectPageInfoBarImage}
          data-test="MediaObject-viewer-image"
          linkedProp={imageLink}
        />
        {filename && (
          <p className={classes.mediaObjectPageInfoBarImageFilename}>
            {filename}
          </p>
        )}
      </a>
    </React.Fragment>
  );
};

export default ImageViewer;

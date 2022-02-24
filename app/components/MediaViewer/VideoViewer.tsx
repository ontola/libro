import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { MediaViewerProps } from './MediaViewer';

const YOUTUBE_TEST = /^(https:)?\/\/(www.)?youtube.com\/embed\//;

const useStyles = makeStyles({
  mediaObjectPageInfoBarVideoContainer: {
    height: 0,
    paddingBottom: '56.25%',
    position: 'relative',
    width: '100%',
  },
  mediaObjectPageInfoBarVideoHtml: {
    marginTop: '.5em',
    width: '100%',
  },
  mediaObjectPageInfoBarVideoIframe: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

interface VideoViewerProps extends MediaViewerProps {
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

const VideoViewer = ({
  autoPlay,
  embedUrl,
  contentUrl,
  loop,
  muted,
  playsInline,
}: VideoViewerProps): JSX.Element => {
  const classes = useStyles();

  if (embedUrl && YOUTUBE_TEST.test(embedUrl)) {
    return (
      <div className={classes.mediaObjectPageInfoBarVideoContainer}>
        <iframe
          allowFullScreen
          allow="encrypted-media"
          className={classes.mediaObjectPageInfoBarVideoIframe}
          data-test="MediaObject-viewer-video-iframe"
          frameBorder="0"
          src={embedUrl}
          title="attachment-inline-video-embed"
        />
      </div>
    );
  }

  /* eslint-disable jsx-a11y/media-has-caption */
  return (
    <video
      autoPlay={autoPlay}
      className={classes.mediaObjectPageInfoBarVideoHtml}
      data-test="MediaObject-viewer-video-html"
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      src={contentUrl}
    />
  );
  /* eslint-enable jsx-a11y/media-has-caption */
};

export default VideoViewer;

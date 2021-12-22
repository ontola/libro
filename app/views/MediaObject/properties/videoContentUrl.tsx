import { makeStyles } from '@material-ui/core/styles';
import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../topologies';

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

interface PropTypes {
  autoPlay: boolean;
  linkedProp: NamedNode;
  loop: boolean;
  muted: boolean;
  playsInline: boolean;
}

const VideoContentUrl: FC<PropTypes> = ({
  autoPlay,
  linkedProp,
  loop,
  muted,
  playsInline,
}) => {
  const [embedUrl] = useProperty(schema.embedUrl);
  const classes = useStyles();

  if (embedUrl && YOUTUBE_TEST.test(embedUrl.value)) {
    return (
      <div className={classes.mediaObjectPageInfoBarVideoContainer}>
        <iframe
          allowFullScreen
          allow="encrypted-media"
          className={classes.mediaObjectPageInfoBarVideoIframe}
          data-test="MediaObject-viewer-video-iframe"
          frameBorder="0"
          src={embedUrl.value}
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
      src={linkedProp.value}
    />
  );
  /* eslint-enable jsx-a11y/media-has-caption */
};

VideoContentUrl.type = schema.VideoObject;

VideoContentUrl.property = schema.contentUrl;

VideoContentUrl.topology = allTopologies;

export default register(VideoContentUrl);

import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../topologies';

const YOUTUBE_TEST = /^(https:)?\/\/(www.)?youtube.com\/embed\//;

interface PropTypes {
  autoPlay: boolean;
  embedUrl: NamedNode;
  linkedProp: NamedNode;
  loop: boolean;
  muted: boolean;
  playsInline: boolean;
}

const VideoContentUrl: FC<PropTypes> = ({
  autoPlay,
  embedUrl,
  linkedProp,
  loop,
  muted,
  playsInline,
}) => {
  if (embedUrl && YOUTUBE_TEST.test(embedUrl.value)) {
    return (
      <div className="MediaObjectPage__infobar--video-container">
        <iframe
          allowFullScreen
          allow="encrypted-media"
          className="MediaObjectPage__infobar--video-iframe "
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
      className="MediaObjectPage__infobar--video-html"
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

VideoContentUrl.mapDataToProps = {
  embedUrl: schema.embedUrl,
};

export default register(VideoContentUrl);

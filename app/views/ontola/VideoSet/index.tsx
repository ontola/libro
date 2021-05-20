import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React, { VideoHTMLAttributes } from 'react';
import { FormattedMessage } from 'react-intl';

import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

export interface VideoSetProps extends VideoHTMLAttributes<HTMLVideoElement> {
  className: string,
}

const VideoSet: FC<VideoSetProps> = (props) => {
  const [ariaLabel] = useProperty(ontola.ariaLabel);

  const [mp4] = useProperty(ontola['format/mp4']);
  const [webm] = useProperty(ontola['format/webm']);

  return (
    <video aria-label={ariaLabel?.value} {...props}>
      {webm && <source src={webm.value} type="video/webm" />}
      {mp4 && <source src={mp4.value} type="video/mp4" />}

      <p>
        <FormattedMessage
          defaultMessage="No video support"
          id="https://ns.ontola.io/app/videoUnsupported"
        />
        <a href={mp4?.value ?? webm?.value}>click here to download</a>
      </p>
    </video>
  );
};

VideoSet.type = ontola.VideoSet;

VideoSet.topology = allTopologies;

export default [
  ...register(VideoSet),
];

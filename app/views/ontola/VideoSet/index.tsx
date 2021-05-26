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
  const [mov] = useProperty(ontola['format/mov']);
  const [webm] = useProperty(ontola['format/webm']);

  const videoElement = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    videoElement.current?.load();
  }, [webm, mp4, mov]);

  return (
    <video aria-label={ariaLabel?.value} {...props} ref={videoElement}>
      {webm && <source src={webm.value} type="video/webm" />}
      {mp4 && <source src={mp4.value} type="video/mp4" />}
      {mov && <source src={mp4.value} type="video/quicktime" />}


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

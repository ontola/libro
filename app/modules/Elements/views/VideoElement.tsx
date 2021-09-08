import { makeStyles } from '@material-ui/styles';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import elements from '../../../ontology/elements';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

const useStyles = makeStyles({
  video: {
    height: 'auto',
    maxWidth: '100%',
  },
});

const VideoElement: FC = () => {
  const className = useStyles();
  const [href] = useProperty(ontola.href);
  const [isGif] = useProperty(argu.ns('isGif'));

  return (
    <video
      muted
      autoPlay={!!isGif?.value}
      className={className.video}
      controls={!isGif?.value}
      loop={!!isGif?.value}
      playsInline={!!isGif?.value}
    >
      <source src={href.value} />
    </video>
  );
};

VideoElement.type = elements.Video;
VideoElement.topology = allTopologies;

export default register(VideoElement);

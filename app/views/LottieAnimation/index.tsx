import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import * as schema from '@ontologies/schema';
import Lottie, { LottieRef } from 'lottie-react';
import React from 'react';

import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

interface LottieAnimationProps {
  onComplete?: () => void;
  onDataReady?: () => void;
  lottieRef?: LottieRef;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation: FC<LottieAnimationProps> = ({
  autoplay,
  loop,
  onComplete,
  onDataReady,
  lottieRef,
}) => {
  const [url] = useProperty(schema.contentUrl);
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    if (!url || !url.value) return;

    fetch(url.value)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        onDataReady && onDataReady();
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, [url]);

  return (
    <Lottie
      animationData={data}
      autoplay={autoplay}
      loop={loop}
      lottieRef={lottieRef}
      onComplete={onComplete}
      onDataReady={onDataReady}
    />
  );
};

LottieAnimation.defaultProps = {
  autoplay: true,
  loop: true,
};

LottieAnimation.type = ontola.LottieAnimation;

LottieAnimation.topology = allTopologies;

export default register(LottieAnimation);

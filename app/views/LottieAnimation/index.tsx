import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import * as schema from '@ontologies/schema';
import React, { Suspense } from 'react';
import type { LottieRef } from 'lottie-react';

import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';
import useJSON from '../../hooks/useJSON';

const Lottie = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Sales" */ 'lottie-react'),
);

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
  const [data] = useJSON(url.value);

  React.useEffect(() => {
    if (data !== undefined) {
      onDataReady?.();
    }
  }, [data]);

  return (
    <Suspense
      fallback={null}
    >
      <Lottie
        animationData={data}
        autoplay={autoplay}
        loop={loop}
        lottieRef={lottieRef}
        onComplete={onComplete}
        onDataReady={onDataReady}
      />
    </Suspense>
  );
};

LottieAnimation.defaultProps = {
  autoplay: true,
  loop: true,
};

LottieAnimation.type = ontola.LottieAnimation;

LottieAnimation.topology = allTopologies;

export default register(LottieAnimation);

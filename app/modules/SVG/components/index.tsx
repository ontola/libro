import React from 'react';

import Suspense from '../../Kernel/components/Suspense';

export interface SVGProps {
  className: string;
  src: string;
}

export interface SVGPropsWithEval extends SVGProps {
  evalScripts: 'never';
}

const SVG = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "SVG" */ '../async'),
);

const SVGLoader = (props: SVGProps): JSX.Element => (
  <Suspense>
    <SVG
      evalScripts="never"
      {...props}
    />
  </Suspense>
);

export default SVGLoader;

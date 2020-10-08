import React from 'react';

import Spinner from '../../../components/Spinner';
import Suspense from '../../../components/Suspense';

const MediaObjectOmniformDropzone = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ './MediaObjectOmniformDropzone')
);

const MediaObjectOmniformDropzoneLoader = (props) => (
  <Suspense fallback={<Spinner loading />}>
    <MediaObjectOmniformDropzone {...props} />
  </Suspense>
);

export default MediaObjectOmniformDropzoneLoader;

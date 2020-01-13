import React from 'react';

import Spinner from '../../../components/Spinner';

const MediaObjectOmniformDropzone = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ './MediaObjectOmniformDropzone')
);

const MediaObjectOmniformDropzoneLoader = (props) => (
  <React.Suspense fallback={<Spinner loading />}>
    <MediaObjectOmniformDropzone {...props} />
  </React.Suspense>
);

export default MediaObjectOmniformDropzoneLoader;

import { Literal } from '@ontologies/core';
import React, {
  EventHandler,
  Ref,
  SyntheticEvent,
} from 'react';

import Spinner from '../../../components/Spinner';
import Suspense from '../../../components/Suspense';

const MediaObjectOmniformDropzone = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ './MediaObjectOmniformDropzone'),
);

export interface MediaObjectOmniformDropzoneProps {
  encodingFormatTypes: string;
  inputRef: Ref<HTMLInputElement>;
  name: string;
  onChange: (e: Literal) => void;
  openDialog: EventHandler<SyntheticEvent<unknown>>;
  value: string;
}

const MediaObjectOmniformDropzoneLoader = (props: MediaObjectOmniformDropzoneProps): JSX.Element => (
  <Suspense fallback={<Spinner loading />}>
    <MediaObjectOmniformDropzone {...props} />
  </Suspense>
);

export default MediaObjectOmniformDropzoneLoader;

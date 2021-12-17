import React, {
  EventHandler,
  Ref,
  SyntheticEvent,
} from 'react';

import Suspense from '../components/Suspense';

const Dropzone = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/Dropzone'),
);

export interface DropzoneProps {
  encodingFormat?: string;
  fileName?: string;
  encodingFormatTypes: string;
  inputRef: Ref<HTMLInputElement>;
  name: string;
  onChange: (acceptedFile: File) => void;
  openDialog: EventHandler<SyntheticEvent<unknown>>;
  preview?: string;
}

const DropzoneLoader = (props: DropzoneProps): JSX.Element => (
  <Suspense>
    <Dropzone {...props} />
  </Suspense>
);

export default DropzoneLoader;

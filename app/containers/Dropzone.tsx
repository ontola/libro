import React, {
  EventHandler,
  Ref,
  SyntheticEvent,
} from 'react';

import Suspense from '../components/Suspense';
import { PreviewedFile } from '../hooks/useFileStore';

import './Dropzone.scss';

const Dropzone = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/Dropzone'),
);

export interface DropzoneProps {
  encodingFormatTypes: string;
  inputRef: Ref<HTMLInputElement>;
  name: string;
  onChange: (acceptedFile: File) => void;
  openDialog: EventHandler<SyntheticEvent<unknown>>;
  value?: PreviewedFile;
}

const DropzoneLoader = (props: DropzoneProps): JSX.Element => (
  <Suspense>
    <Dropzone {...props} />
  </Suspense>
);

export default DropzoneLoader;

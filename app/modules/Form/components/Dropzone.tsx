import React, {
  EventHandler,
  Ref,
  SyntheticEvent,
} from 'react';

import Suspense from '../../Kernel/components/Suspense';
import { HandleFileChange } from '../hooks/useFileInput';

const Dropzone = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/Dropzone'),
);

export interface DropzoneProps {
  clearable?: boolean
  encodingFormat?: string;
  fileName?: string;
  encodingFormatTypes: string;
  inputRef: Ref<HTMLInputElement>;
  maxSize?: number;
  name: string;
  onChange: HandleFileChange;
  openDialog: EventHandler<SyntheticEvent<unknown>>;
  preview?: string;
}

const DropzoneLoader = (props: DropzoneProps): JSX.Element => (
  <Suspense>
    <Dropzone {...props} />
  </Suspense>
);

export default DropzoneLoader;

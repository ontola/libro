import { SomeNode } from 'link-lib';
import React, { KeyboardEventHandler } from 'react';

import Omniform from './index';

export interface OmniformConnectorProps {
  autofocusForm: boolean;
  borderTop?: boolean;
  closeForm?: () => void;
  entryPointWrapper?: React.ElementType;
  items: SomeNode[];
  onDone: () => void;
  onKeyUp: KeyboardEventHandler;
  subject: SomeNode;
}

const OmniformConnector = ({
  autofocusForm,
  borderTop,
  closeForm,
  entryPointWrapper,
  items,
  onDone,
  onKeyUp,
  subject,
}: OmniformConnectorProps): JSX.Element => (
  <Omniform
    actions={new Set(items)}
    autofocusForm={autofocusForm}
    borderTop={borderTop}
    closeForm={closeForm}
    entryPointWrapper={entryPointWrapper}
    parentIRI={btoa(subject.value)}
    onDone={onDone}
    onKeyUp={onKeyUp}
  />
);

export default OmniformConnector;

import { SomeNode } from 'link-lib';
import React, { KeyboardEventHandler } from 'react';

import { OnDoneHandler } from '../../../views/Action/helpers';

import Omniform from './Omniform';

export interface OmniformConnectorProps {
  autofocusForm: boolean;
  closeForm?: () => void;
  items: SomeNode[];
  onDone: OnDoneHandler;
  onKeyUp: KeyboardEventHandler;
  subject: SomeNode;
}

const OmniformConnector = ({
  autofocusForm,
  closeForm,
  items,
  onDone,
  onKeyUp,
  subject,
}: OmniformConnectorProps): JSX.Element => (
  <Omniform
    actions={new Set(items)}
    autofocusForm={autofocusForm}
    closeForm={closeForm}
    parentIRI={btoa(subject.value)}
    onDone={onDone}
    onKeyUp={onKeyUp}
  />
);

export default OmniformConnector;

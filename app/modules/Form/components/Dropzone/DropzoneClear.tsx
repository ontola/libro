import React, { MouseEventHandler } from 'react';
import FontAwesome from 'react-fontawesome';

import Button from '../../../Common/components/Button';
import FormInputButtons from '../FormField/FormInputButtons';

interface DropzoneClear {
  onClear: MouseEventHandler;
}

const DropzoneClear = ({
  onClear,
}: DropzoneClear): JSX.Element => (
  <FormInputButtons>
    <Button
      plain
      onClick={onClear}
    >
      <FontAwesome name="times" />
    </Button>
  </FormInputButtons>
);

export default DropzoneClear;

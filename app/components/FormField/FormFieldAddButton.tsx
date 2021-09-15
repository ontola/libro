import React, { EventHandler } from 'react';
import FontAwesome from 'react-fontawesome';

import Button, { ButtonTheme } from '../Button';

interface PropTypes {
  addFormValue: EventHandler<any>;
  label: string | React.ReactNode;
}

const FormFieldAddButton: React.FC<PropTypes> = ({
  addFormValue,
  label,
}) => (
  <div>
    <Button
      theme={ButtonTheme.Transparent}
      onClick={addFormValue}
    >
      <FontAwesome name="plus" />
      {' '}
      {label}
    </Button>
  </div>
);

export default FormFieldAddButton;

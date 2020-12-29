import React, { EventHandler } from 'react';
import FontAwesome from 'react-fontawesome';

import Button, { ButtonTheme } from '../Button';

interface PropTypes {
  addItem: EventHandler<any>;
  label: string | React.ReactNode;
}

const FormFieldAddButton: React.FC<PropTypes> = ({
  addItem,
  label,
}) => (
  <div>
    <Button
      theme={ButtonTheme.Transparant}
      onClick={addItem}
    >
      <FontAwesome name="plus" />
      {' '}
      {label}
    </Button>
  </div>
);

export default FormFieldAddButton;

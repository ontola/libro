import React from 'react';
import FontAwesome from 'react-fontawesome';

import Button from '../Button';

const FormFieldAddButton = ({
  addItem,
  label,
}: {
  addItem: (e: any) => any,
  label: string | React.ReactNode,
}) => (
  <div>
    <Button
      theme="transparant"
      onClick={addItem}
    >
      <FontAwesome name="plus" />
      {' '}
      {label}
    </Button>
  </div>
);

export default FormFieldAddButton;

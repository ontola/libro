import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import Button from '../Button';

const FormFieldAddButton = ({ addItem, label }) => (
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

FormFieldAddButton.propTypes = {
  addItem: PropTypes.func,
  label: PropTypes.string,
};

export default FormFieldAddButton;

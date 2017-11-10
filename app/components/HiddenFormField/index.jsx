import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

const HiddenFormField = props => (
  <input name={props.input.name} type="hidden" value={props.input.value} />
);

HiddenFormField.propTypes = propTypes;

export default HiddenFormField;

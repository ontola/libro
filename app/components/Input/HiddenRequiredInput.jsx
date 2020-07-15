import PropTypes from 'prop-types';
import React from 'react';

const HiddenRequiredInput = ({ name, value }) => (
  <input
    required
    className="hidden-field"
    id={name}
    name={name}
    type="text"
    value={value}
  />
);

HiddenRequiredInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
};

export default HiddenRequiredInput;

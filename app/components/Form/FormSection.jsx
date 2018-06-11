import PropTypes from 'prop-types';
import React from 'react';
import { Scope } from 'informed';

const propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

const FormSection = ({ children, name }) => (
  <Scope component="fieldset" scope={name}>
    {children}
  </Scope>
);

FormSection.propTypes = propTypes;

export default FormSection;

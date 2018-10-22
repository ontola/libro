import PropTypes from 'prop-types';
import React from 'react';
import { Scope } from 'informed';
import { linkType } from 'link-redux';

const propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  path: linkType,
};

const FormSection = ({ children, name, path }) => (
  <Scope component="fieldset" scope={name}>
    <div property={path.value}>
      {children}
    </div>
  </Scope>
);

FormSection.propTypes = propTypes;

export default FormSection;

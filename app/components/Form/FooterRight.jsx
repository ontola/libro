import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const FormFooterRight = ({ children }) => (
  <div className="Form__footer--right">
    {children}
  </div>
);

FormFooterRight.propTypes = propTypes;

export default FormFooterRight;

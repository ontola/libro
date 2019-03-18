import PropTypes from 'prop-types';
import React from 'react';

const FieldLabel = ({
  htmlFor,
  label,
  hidden,
  required,
}) => (
  <label
    className={`Field__label${hidden ? ' AriaHidden' : ''}`}
    htmlFor={htmlFor}
  >
    {label}
    {required && <span className="Field__label-required">*</span>}
  </label>
);

FieldLabel.propTypes = {
  hidden: PropTypes.bool,
  htmlFor: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  required: PropTypes.bool,
};

export default FieldLabel;

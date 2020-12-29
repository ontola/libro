import React from 'react';

interface PropTypes {
  htmlFor: string;
  label: string | React.ReactNode;
  hidden?: boolean;
  required?: boolean;
}

const FieldLabel: React.FC<PropTypes> = ({
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

export default FieldLabel;

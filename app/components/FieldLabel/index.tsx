import clsx from 'clsx';
import React from 'react';

export const fieldLabelCID = 'CID-FieldLabel';

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
    className={clsx({
      'AriaHidden': hidden,
      'Field__label': true,
      [fieldLabelCID]: true,
    })}
    htmlFor={htmlFor}
  >
    {label}
    {required && (
      <span className="Field__label-required">
        *
      </span>
    )}
  </label>
);

export default FieldLabel;

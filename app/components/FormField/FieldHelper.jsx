import PropTypes from 'prop-types';
import React from 'react';

import { formFieldError } from './index';
import './FieldHelper.scss';

const propTypes = {
  error: formFieldError,
  helperText: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  right: PropTypes.element,
  variant: PropTypes.oneOf([
    'default',
    'preview',
  ]),
};

const FieldHelper = ({
  helperText,
  error,
  right,
  variant,
}) => {
  const errMsg = Array.isArray(error) ? error[0] : error;

  if (!helperText && !errMsg) {
    return null;
  }

  const err = errMsg && (
    <span className="Field__error">
      {errMsg.error || errMsg}
    </span>
  );

  return (
    <div className={`FieldHelper${variant === 'preview' ? ' FieldHelper--preview' : ''}`}>
      {err || helperText}
      {right && (
        <span className="FieldHelper__right">
          {right}
        </span>
      )}
    </div>
  );
};

FieldHelper.propTypes = propTypes;

export default FieldHelper;

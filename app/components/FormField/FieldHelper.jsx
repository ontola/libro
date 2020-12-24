import PropTypes from 'prop-types';
import React from 'react';

import { FormContext } from '../Form/Form';

import { formFieldError } from './index';
import './FieldHelper.scss';

const propTypes = {
  error: formFieldError,
  helperText: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  right: PropTypes.element,
};

const FieldHelper = ({
  helperText,
  error,
  right,
}) => {
  const { theme } = React.useContext(FormContext);
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
    <div className={`FieldHelper${theme === 'preview' ? ' FieldHelper--preview' : ''}`}>
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

import React from 'react';

import { FormContext } from '../Form/Form';

import './FieldHelper.scss';
import { FormFieldError } from './index';

const FieldHelper = ({
  helperText,
  error,
  right,
}: {
  helperText: string | React.ReactNode,
  error: FormFieldError,
  right?: React.ReactNode,
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

export default FieldHelper;

import React from 'react';

import { FormContext } from '../Form/Form';

import './FieldHelper.scss';
import { FormFieldError } from './index';

interface PropTypes {
  helperText?: string | React.ReactNode;
  error?: FormFieldError;
  right?: React.ReactNode;
}

const FieldHelper: React.FC<PropTypes> = ({
  helperText,
  error,
  right,
}) => {
  const { theme } = React.useContext(FormContext);

  if (!helperText && !error) {
    return null;
  }

  const err = error && (
    <span className="Field__error">
      {error.error || error}
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

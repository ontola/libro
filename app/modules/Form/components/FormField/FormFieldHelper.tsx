import React from 'react';

import { isJSONLDObject } from '../../lib/helpers';
import { formContext } from '../Form/FormContext';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';
import FieldHelper from './FieldHelper';
import { formFieldContext } from './FormFieldContext';
import { FormFieldError, InputValue } from './FormFieldTypes';

interface ErrorHelper {
  error: FormFieldError;
  value?: InputValue;
}

interface ValueHelper {
  error?: FormFieldError;
  value: InputValue;
}

const FormFieldHelper: React.FC<ErrorHelper | ValueHelper> = ({
  error,
  value,
}) => {
  const { theme } = React.useContext(formContext);
  const {
    fieldShape,
    helperText,
  } = React.useContext(formFieldContext);
  const {
    maxLength,
  } = fieldShape;

  const renderCharCounter = theme !== 'preview';

  if (theme === 'preview' && !error) {
    return null;
  }

  const renderHelperText = helperText === null || (helperText?.length || 0) > 0;

  return (
    <FieldHelper
      error={error}
      helperText={renderHelperText ? helperText : ''}
      right={renderCharCounter && maxLength && value && !isJSONLDObject(value) ? (
        <CharCounter
          maxLength={maxLength}
          threshold={CHAR_COUNTER_THRESHOLD}
          value={value}
        />
      ) : undefined}
    />
  );
};

export default FormFieldHelper;

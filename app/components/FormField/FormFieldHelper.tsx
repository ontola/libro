import React from 'react';
import { FormattedMessage } from 'react-intl';

import { isJSONLDObject } from '../../helpers/types';
import { InputValue } from '../../hooks/useFormField';
import { formContext } from '../Form/FormContext';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';
import FieldHelper from './FieldHelper';
import { FormFieldContext } from './FormField';

import { FormFieldError } from './';

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
    meta: { touched },
  } = React.useContext(FormFieldContext);
  const {
    maxLength,
    required,
  } = fieldShape;

  const renderCharCounter = theme !== 'preview';

  if (theme === 'preview' && !error) {
    return null;
  }

  const requiredHelper = required && (
    <FormattedMessage
      defaultMessage="*Required"
      id="https://app.argu.co/i18n/forms/required/helperText"
    />
  );
  const renderHelperText = helperText === null || (helperText?.length || 0) > 0;

  return (
    <FieldHelper
      error={touched ? error : undefined}
      helperText={renderHelperText ? helperText : requiredHelper}
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

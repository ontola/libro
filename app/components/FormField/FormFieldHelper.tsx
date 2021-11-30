import React from 'react';
import { FormattedMessage } from 'react-intl';

import { isJSONLDObject } from '../../helpers/types';
import { InputValue } from '../../hooks/useFormField';
import { FormContext } from '../Form/Form';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';
import FieldHelper from './FieldHelper';
import { FormFieldContext } from './FormField';

import { FormFieldError } from './index';

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
  const { theme } = React.useContext(FormContext);
  const {
    fieldShape,
    helperText,
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

  return (
    <FieldHelper
      error={error}
      helperText={helperText ?? requiredHelper}
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

import { SomeTerm } from '@ontologies/core';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { FormContext, FormTheme } from '../Form/Form';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';
import FieldHelper from './FieldHelper';

import { FormFieldError } from './';

interface PropTypes {
  error: FormFieldError;
  maxLength: number;
  required: boolean;
  touched?: boolean;
  value: SomeTerm | string;
}

const FormFieldHelper: React.FC<PropTypes> = ({
  error,
  maxLength,
  required,
  touched,
  value,
}) => {
  const { theme } = React.useContext(FormContext);
  const renderCharCounter = theme !== FormTheme.Preview;

  if (theme === 'preview' && !error) {
    return null;
  }

  const helperText = required && (
    <FormattedMessage
      defaultMessage="*Required"
      id="https://app.argu.co/i18n/forms/required/helperText"
    />
  );

  return (
    <FieldHelper
      error={touched ? error : undefined}
      helperText={helperText}
      right={renderCharCounter ? (
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

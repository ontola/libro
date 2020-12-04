import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';
import FieldHelper from './FieldHelper';

const FormFieldHelper = ({
  error,
  maxLength,
  required,
  value,
  variant,
}) => {
  const renderCharCounter = variant !== 'preview';
  if (variant === 'preview' && !error) {
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
      error={error}
      helperText={helperText}
      right={renderCharCounter ? (
        <CharCounter
          maxLength={maxLength}
          threshold={CHAR_COUNTER_THRESHOLD}
          value={value}
        />
      ) : undefined}
      variant={variant}
    />
  );
};

FormFieldHelper.propTypes = {
  error: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    linkType,
    PropTypes.string,
  ]),
  variant: PropTypes.string,
};

export default FormFieldHelper;

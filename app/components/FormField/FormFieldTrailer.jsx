import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { FormContext } from '../Form/Form';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';

import { formFieldError } from './index';

const FormFieldTrailer = ({
  errors,
  maxLength,
  meta,
  inputValue,
}) => {
  const {
    active,
    pristine,
  } = meta;
  const { theme } = React.useContext(FormContext);

  if (errors && errors.length > 0 && !pristine && !active) {
    return (
      <span
        className="Field__input--trailing-icon fa fa-exclamation-circle"
        style={{
          color: '#c81414',
        }}
        title={errors[0]}
      />
    );
  }

  if (theme === 'preview') {
    return (
      <CharCounter
        maxLength={maxLength}
        threshold={CHAR_COUNTER_THRESHOLD}
        value={inputValue?.value}
      />
    );
  }

  return null;
};

FormFieldTrailer.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  inputValue: linkType,
  maxLength: PropTypes.number,
  meta: PropTypes.shape({
    active: PropTypes.bool,
    dirty: PropTypes.bool,
    error: PropTypes.arrayOf(formFieldError),
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    touched: PropTypes.bool,
  }),
};

export default FormFieldTrailer;

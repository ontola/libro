import { SomeTerm } from '@ontologies/core';
import PropTypes from 'prop-types';
import React from 'react';

import { FormContext } from '../Form/Form';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';
import { FormFieldContext } from './FormField';

import { FormFieldError } from './index';

interface PropTypes {
  errors: FormFieldError[];
  inputValue: SomeTerm;
}

const style = {
  color: '#c81414',
};

const FormFieldTrailer: React.FC<PropTypes> = ({
  errors,
  inputValue,
}) => {
  const { theme } = React.useContext(FormContext);
  const {
    fieldShape: { maxLength },
    meta,
  } = React.useContext(FormFieldContext);
  const {
    active,
    pristine,
  } = meta;

  if (errors && errors.length > 0 && !pristine && !active) {
    return (
      <span
        className="Field__input--trailing-icon fa fa-exclamation-circle"
        style={style}
        title={errors[0].error}
      />
    );
  }

  if (theme === 'preview' && maxLength) {
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

export default FormFieldTrailer;

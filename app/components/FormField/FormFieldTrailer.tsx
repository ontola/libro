import { SomeTerm } from '@ontologies/core';
import PropTypes from 'prop-types';
import React from 'react';

import { FormContext } from '../Form/Form';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';

import { InputMeta } from './index';

interface PropTypes {
  errors: string[];
  inputValue: SomeTerm;
  maxLength: number;
  meta: InputMeta;
}

const FormFieldTrailer = ({
  errors,
  maxLength,
  meta,
  inputValue,
}: PropTypes) => {
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

export default FormFieldTrailer;

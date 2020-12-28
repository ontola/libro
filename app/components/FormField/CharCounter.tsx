import { isLiteral, SomeTerm } from '@ontologies/core';
import PropTypes from 'prop-types';
import React from 'react';

import { isString } from '../../helpers/types';

import './CharCounter.scss';

export const CHAR_COUNTER_THRESHOLD = 0.8;

interface PropTypes {
  maxLength: number;
  threshold: number;
  value: SomeTerm | string;
}

const CharCounter = ({
  maxLength,
  threshold,
  value,
}: PropTypes) => {
  let currentLength;
  if (isLiteral(value)) {
    currentLength = value.value.length;
  } else if (isString(value)) {
    currentLength = value.length;
  } else {
    return null;
  }

  if (threshold && (!currentLength || (currentLength / maxLength) <= threshold)) {
    return null;
  }

  if (!maxLength) {
    return null;
  }

  const charError = maxLength && (maxLength < currentLength ? ' CharCounter--error' : '');

  return (
    <span className={`CharCounter${charError}`}>
      {currentLength}/{maxLength}
    </span>
  );
};

export default CharCounter;

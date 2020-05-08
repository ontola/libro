import { isLiteral } from '@ontologies/core';
import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import './CharCounter.scss';

export const CHAR_COUNTER_THRESHOLD = 0.8;

const propTypes = {
  maxLength: PropTypes.number,
  threshold: PropTypes.number,
  value: linkType,
};

const CharCounter = ({
  maxLength,
  threshold,
  value,
}) => {
  const currentLength = isLiteral(value) ? value.value.length : value?.length;

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

CharCounter.propTypes = propTypes;

export default CharCounter;

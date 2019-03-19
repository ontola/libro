import PropTypes from 'prop-types';
import React from 'react';

import './CharCounter.scss';

const propTypes = {
  currentLength: PropTypes.number,
  maxLength: PropTypes.number,
};

const CharCounter = ({
  currentLength,
  maxLength,
}) => {
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

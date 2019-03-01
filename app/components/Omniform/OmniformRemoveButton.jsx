import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';

import './Omniform.scss';

const OmniformRemoveButton = ({ removeItem }) => {
  if (!removeItem) {
    return null;
  }

  return (
    <Button
      plain
      className="Omniform__remove-button"
      icon="times"
      onClick={removeItem}
    />
  );
};

OmniformRemoveButton.propTypes = {
  removeItem: PropTypes.func,
};

export default OmniformRemoveButton;

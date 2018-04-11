import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
};

const DetailText = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <span className="Detail__text" data-test="Detail-text">
      {children}
    </span>
  );
};

DetailText.propTypes = propTypes;

export default DetailText;

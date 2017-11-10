import PropTypes from 'prop-types';
import React from 'react';

import './Card.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  noSpacing: PropTypes.bool,
};

/**
 * Just a wrapper component
 * @returns {component} Component
 */
const CardHeader = ({
  children,
  noSpacing,
}) => (
  <div
    className={
      noSpacing ? 'CardHeader CardHeader--no-spacing' : 'CardHeader'
    }
  >{children}
  </div>
);

CardHeader.propTypes = propTypes;

export default CardHeader;

import PropTypes from 'prop-types';
import React from 'react';

import './Card.scss';

const propTypes = {
  alignRight: PropTypes.bool,
  children: PropTypes.node.isRequired,
  noSpacing: PropTypes.bool,
};

/**
 * A wrapper for CardButtons to provide for the correct styling
 * @returns {component} Component
 */
const CardActions = ({
  alignRight,
  children,
  noSpacing,
}) => (
  <div
    className={`CardActions ${noSpacing ? 'CardActions--no-spacing' : ''} ${alignRight ? 'CardActions--align-right' : ''}`}
  >
    {children}
  </div>
);

CardActions.propTypes = propTypes;

export default CardActions;

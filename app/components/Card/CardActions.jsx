import './Card.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  noSpacing: PropTypes.bool,
};

/**
 * A wrapper for CardButtons to provide for the correct styling
 * @returns {component} Component
 */
const CardActions = ({
  children,
  noSpacing,
}) => (
  <div
    className={
      noSpacing ? 'CardActions CardActions--no-spacing' : 'CardActions'
    }
  >{children}</div>
);

CardActions.propTypes = propTypes;

export default CardActions;

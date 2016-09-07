import './Card.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  noSpacing: PropTypes.bool,
};

const CardActions = ({
  children,
  noSpacing,
}) => (
  <div
    children={children}
    className={
      noSpacing ? 'CardActions CardActions--no-spacing' : 'CardActions'
    }
  />
);

CardActions.propTypes = propTypes;

export default CardActions;

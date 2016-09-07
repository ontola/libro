import './Card.scss';
import React, { PropTypes } from 'react';

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
    children={children}
    className={
      noSpacing ? 'CardHeader CardHeader--no-spacing' : 'CardHeader'
    }
  />
);

CardHeader.propTypes = propTypes;

export default CardHeader;

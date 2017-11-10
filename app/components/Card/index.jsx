import PropTypes from 'prop-types';
import React from 'react';

import './Card.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
const Card = ({
  children,
}) => (
  <div className="Card">{children}</div>
);

Card.propTypes = propTypes;

export { default as CardActions } from './CardActions';
export { default as CardButton } from './CardButton';
export { default as CardContent } from './CardContent';
export { default as CardDivider } from './CardDivider';
export { default as CardHeader } from './CardHeader';
export { default as CardRow } from './CardRow';
export default Card;

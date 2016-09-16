import './Card.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  showArrow: PropTypes.bool,
};

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
const CardRow = ({
  children,
  showArrow,
}) => (
  <div
    children={children}
    className={
      showArrow ? 'CardRow CardRow--show-arrow' : 'CardRow'
    }
  />
);

CardRow.propTypes = propTypes;

export default CardRow;

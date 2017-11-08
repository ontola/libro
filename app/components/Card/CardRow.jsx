import React, { PropTypes } from 'react';

import './Card.scss';

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
    className={
      showArrow ? 'CardRow CardRow--show-arrow' : 'CardRow'
    }
  >{children}
  </div>
);

CardRow.propTypes = propTypes;

export default CardRow;

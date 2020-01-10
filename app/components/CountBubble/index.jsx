import PropTypes from 'prop-types';
import React from 'react';

import './CountBubble.scss';

const propTypes = {
  /** The number displayed in the bubble */
  count: PropTypes.number,
};

// Small item to indicate the count of something important.
const CountBubble = ({
  count,
}) => (
  <div
    className="CountBubble CountBubble--pop-out"
  >
    <div className="CountBubble__number">
      {count}
    </div>
  </div>
);


CountBubble.propTypes = propTypes;

export default CountBubble;

// @flow
import React, { PropTypes } from 'react';
import AnimateOnChange from 'react-animate-on-change';

import './CountBubble.scss';

const propTypes = {
  /** The number displayed in the bubble */
  count: PropTypes.number,
};

// Small item to indicate the count of something important.
const CountBubble = ({
  count,
}) => (
  <AnimateOnChange
    baseClassName="CountBubble"
    animationClassName="CountBubble--pop-out"
    animate={count !== 0}
  >
    <div className="CountBubble__number">
      {count}
    </div>
  </AnimateOnChange>
);

CountBubble.propTypes = propTypes;

export default CountBubble;

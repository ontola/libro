import PropTypes from 'prop-types';
import React from 'react';
import { Keyframes } from 'react-spring';

import './CountBubble.scss';

const propTypes = {
  /** The number displayed in the bubble */
  count: PropTypes.number,
};

const Animation = Keyframes.Spring([
  { scale: 1 },
  { scale: 0.7 },
  { scale: 1.5 },
  { scale: 1 },
]);


// Small item to indicate the count of something important.
const CountBubble = ({
  count,
}) => {
  // eslint-disable-next-line
  const body = ({ scale }) => (
    <div
      className="CountBubble"
      style={{
        transform: scale && `scale(${scale})`,
      }}
    >
      <div className="CountBubble__number">
        {count}
      </div>
    </div>
  );

  if (count === 0) {
    return body({});
  }

  return (
    <Animation
      config={{
        duration: 300,
      }}
    >
      {body}
    </Animation>
  );
};

CountBubble.propTypes = propTypes;

export default CountBubble;

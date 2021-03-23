import React from 'react';

import './CountBubble.scss';

export interface CountBubbleProps {
  /** The number displayed in the bubble */
  count: number,
}

// Small item to indicate the count of something important.
const CountBubble = ({
  count,
}: CountBubbleProps): JSX.Element => (
  <div
    className="CountBubble CountBubble--pop-out"
  >
    <div className="CountBubble__number">
      {count}
    </div>
  </div>
);

export default CountBubble;

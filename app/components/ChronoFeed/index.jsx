import React, { PropTypes } from 'react';

import SpeechContainer from 'containers/SpeechContainer';

import List from '../List';

const defaultRenderItem = id => (
  <SpeechContainer id={id} key={id} />
);

const propTypes = {
  renderItem: PropTypes.func,
  speechIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const defaultProps = {
  renderItem: defaultRenderItem,
  speechIds: [],
};

const ChronoFeed = ({
  renderItem,
  speechIds,
}) => (
  <div className="ChronoFeed">
    <List
      items={speechIds}
      renderItem={renderItem}
    />
  </div>
);

ChronoFeed.propTypes = propTypes;
ChronoFeed.defaultProps = defaultProps;

export default ChronoFeed;

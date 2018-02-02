import { LinkedResourceContainer } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import List from '../List';

const defaultRenderItem = id => (
  <LinkedResourceContainer key={`chrono-feed-${id}`} subject={id} />
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

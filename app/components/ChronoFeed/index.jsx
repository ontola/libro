import React, { PropTypes } from 'react';
import SpeechContainer from 'containers/SpeechContainer';
import {
  List,
} from 'components';

const defaultRenderItem = id => (
  <SpeechContainer key={id} id={id} />
);

const propTypes = {
  renderItem: PropTypes.func,
  speechIds: PropTypes.array.isRequired,
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
      renderItem={renderItem}
      items={speechIds}
    />
  </div>
);

ChronoFeed.propTypes = propTypes;
ChronoFeed.defaultProps = defaultProps;

export default ChronoFeed;

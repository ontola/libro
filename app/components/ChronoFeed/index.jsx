import React, { PropTypes } from 'react';
import SpeechContainer from 'containers/SpeechContainer';
import {
  List,
} from 'components';

const propTypes = {
  speechIds: PropTypes.array,
};

const defaultProps = {
  speechIds: [],
};

function renderItem(id) {
  return (
    <SpeechContainer key={id} id={id} />
  );
}

const ChronoFeed = ({
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

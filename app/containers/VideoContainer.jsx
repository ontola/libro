// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { VideoPlayer } from 'components';

const propTypes = {
  eventId: PropTypes.string.isRequired,
  onSetTime: PropTypes.func.isRequired,
};

class EventContainer extends Component {
  render() {
    return (
      <VideoPlayer
        isPlaying
      />
    );
  }
}

EventContainer.propTypes = propTypes;

export default connect()(EventContainer);

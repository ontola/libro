// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { VideoPlayer } from 'components';

const propTypes = {
  eventId: PropTypes.string.isRequired,
  onSetTime: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

class EventContainer extends Component {
  render() {
    return (
      <VideoPlayer
        isPlaying
        url={this.props.url}
      />
    );
  }
}

EventContainer.propTypes = propTypes;

export default connect()(EventContainer);

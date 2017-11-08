import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  setEventTime,
} from 'state/events/actions';

import { VideoPlayer } from '../components';

const propTypes = {
  onSetTime: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

const REFRESH_TIME = 1000;

class VideoContainer extends Component {
  componentDidMount() {
    setInterval(
      () => {
        if (this.state.isPlaying) {
          this.props.onSetTime(new Date());
        }
      },
      REFRESH_TIME
    );
  }

  render() {
    return (
      <VideoPlayer
        isPlaying
        url={this.props.url}
      />
    );
  }
}

VideoContainer.propTypes = propTypes;

export default connect(dispatch => ({
  onSetTime: date => dispatch(setEventTime(date)),
}))(VideoContainer);

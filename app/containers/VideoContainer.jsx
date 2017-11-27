import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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

export default connect(undefined, (dispatch, ownProps) => ({
  onSetTime: date => dispatch(ownProps.onSetTime(date)),
}))(VideoContainer);

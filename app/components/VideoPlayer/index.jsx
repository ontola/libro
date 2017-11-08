import React, { Component, PropTypes } from 'react';
import Video from 'react-html5video';

import './VideoPlayer.scss';

const propTypes = {
  url: PropTypes.string,
  id: PropTypes.string,
  isPlaying: PropTypes.bool,
};

// How long it takes before currentTime is updated.
const REFRESH_TIME = 1000;

class VideoPlayer extends Component {
  componentDidMount() {
    setInterval(
      () => {
        if (this.props.isPlaying) {
          // console.log('tick');
          // props.onSetTime(props.eventId, new Date());
        } else {
          // console.log('stop');
        }
      },
      REFRESH_TIME
    );
  }

  render() {
    return (
      <Video
        autoPlay
        controls
        fullscreen
        loop
        muted
        poster="http://sourceposter.jpg"
        ref={this.props.id}
      >
        <source src={this.props.url} type="video/mp4" />
      </Video>
    );
  }
}
VideoPlayer.propTypes = propTypes;

export default VideoPlayer;

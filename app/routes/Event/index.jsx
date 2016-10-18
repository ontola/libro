// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
  setEventTime,
  toggleShowVideo,
} from 'state/events/actions';

import {
  Container,
  SideBar,
} from 'components';

import {
  getEventTitle,
  shouldVideoShow,
} from 'state/events/selectors';

import EventContainer from 'containers/EventContainer';
import VideoContainer from 'containers/VideoContainer';
import SpeechesContainer from 'containers/SpeechesContainer';

const propTypes = {
  params: PropTypes.object.isRequired,
  title: PropTypes.string,
  onToggleShowVideo: PropTypes.func.isRequired,
  showVideo: PropTypes.bool,
  videoUrl: PropTypes.string,
};

const Event = ({
  params,
  title,
  onToggleShowVideo,
  showVideo,
  videoUrl,
}) => {
  const sideBarContent = (
    <div className="SideBar--sidebar-wrapper">
      <div className="SideBar--top">
        {showVideo &&
          <VideoContainer
            id={`video_${params.eventId}`}
            url={videoUrl}
          />
        }
        <div className="SideBar__controls">
          {!showVideo &&
            <button
              onClick={() => onToggleShowVideo(params.eventId)}
            >
              Video weergeven
            </button>
          }
          {showVideo &&
            <button
              onClick={() => onToggleShowVideo(params.eventId)}
            >
              Video verbergen
            </button>
          }
          <input
            type="text"
            placeholder="Zoeken..."
            onChange={event => console.log(event.target.value)}
          />
        </div>
      </div>
      <div className="SideBar--bottom">
        <SpeechesContainer eventId={params.eventId} />
      </div>
    </div>
  );

  return (
    <SideBar
      sidebar={sideBarContent}
    >
      <Container>
        <Helmet title={title} />
        <EventContainer id={params.eventId} />
      </Container>
    </SideBar>
  );
};

Event.propTypes = propTypes;

const stateToProps = (state, ownProps) => ({
  title: getEventTitle(state, ownProps),
  showVideo: shouldVideoShow(state),
});

export default connect(
  stateToProps,
  dispatch => ({
    onToggleShowVideo: (eventId) => { dispatch(toggleShowVideo(eventId)); },
    onSetEventTime: (eventId, time) => { dispatch(setEventTime(eventId, time)); },
  })
)(Event);

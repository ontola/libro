// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
  setEventTime,
  toggleShowVideo,
} from 'state/events/actions';

import {
  Button,
  Container,
  SideBar,
} from 'components';

import {
  getEventTitle,
  shouldVideoShow,
  text,
} from 'state/events/selectors';

import { createSearchAction } from 'redux-search';

import EventContainer from 'containers/EventContainer';
import VideoContainer from 'containers/VideoContainer';
import SpeechesContainer from 'containers/SpeechesContainer';

const propTypes = {
  params: PropTypes.object.isRequired,
  title: PropTypes.string,
  onToggleShowVideo: PropTypes.func.isRequired,
  onSearchSpeeches: PropTypes.func.isRequired,
  showVideo: PropTypes.bool,
  videoUrl: PropTypes.string,
};

const Event = ({
  params,
  title,
  onToggleShowVideo,
  onSearchSpeeches,
  showVideo,
  videoUrl,
}) => {
  const ONCHANGE_QUERY_LENGTH = 3;

  function searchItMaybe(query) {
    if (query.length > ONCHANGE_QUERY_LENGTH) {
      onSearchSpeeches(query);
    }
    return null;
  }

  const sideBarContent = (
    <div className="SideBar--sidebar-wrapper">
      <div className="SideBar--top">
        {videoUrl && showVideo &&
          <VideoContainer
            id={`video_${params.eventId}`}
            url={videoUrl}
          />
        }
        <div className="SideBar__controls">
          {videoUrl && !showVideo &&
            <Button
              icon="play"
              theme="transparant"
              onClick={() => onToggleShowVideo(params.eventId)}
            >
              Video weergeven
            </Button>
          }
          {videoUrl && showVideo &&
            <Button
              icon="close"
              theme="transparant"
              onClick={() => onToggleShowVideo(params.eventId)}
            >
              Video verbergen
            </Button>
          }
          <input
            className="SideBar__search"
            type="text"
            placeholder="Zoeken in discussie..."
            onChange={event => searchItMaybe(event.target.value)}
            value={text}
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
  searchQuery: text,
  videoUrl: 'http://player.companywebcast.com/gemeenteutrecht/20160407_3/nl/resource/download/mp4/bb/gemeente%20utrecht-20160407_3.mp4',
});

export default connect(
  stateToProps,
  dispatch => ({
    onToggleShowVideo: eventId => dispatch(toggleShowVideo(eventId)),
    onSetEventTime: (eventId, time) => dispatch(setEventTime(eventId, time)),
    onSearchSpeeches: searchText => dispatch(createSearchAction('speeches')(searchText)),
  })
)(Event);

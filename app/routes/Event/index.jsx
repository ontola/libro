import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { reset } from 'redux-form';
import { createSearchAction } from 'redux-search';

import {
  Button,
  Container,
} from 'components';
import EventContainer from 'containers/EventContainer';
import SearchInput from 'containers/SearchInput';
import SideBarContainer from 'containers/SideBarContainer';
import SpeechesContainer from 'containers/SpeechesContainer';
import TimelineHideButton from 'containers/TimelineHideButton';
import VideoContainer from 'containers/VideoContainer';
import {
  setEventTime,
  toggleShowVideo,
} from 'state/events/actions';
import {
  getEventTitle,
  getVideoUrl,
  shouldVideoShow,
} from 'state/events/selectors';

const propTypes = {
  onSearchSpeeches: PropTypes.func.isRequired,
  onToggleShowVideo: PropTypes.func.isRequired,
  params: PropTypes.shape({
    eventId: PropTypes.string.isRequired,
  }).isRequired,
  resetSearchForm: PropTypes.func.isRequired,
  showVideo: PropTypes.bool,
  title: PropTypes.string,
  videoUrl: PropTypes.string,
};

const Event = ({
  onSearchSpeeches,
  onToggleShowVideo,
  params,
  resetSearchForm,
  showVideo,
  title,
  videoUrl,
}) => {
  const handleSearch = (values) => {
    const searchValue = values.get('search');
    if (searchValue === undefined) {
      onSearchSpeeches('');
    } else {
      onSearchSpeeches(searchValue);
    }
  };

  const handleClear = () => {
    resetSearchForm();
    onSearchSpeeches('');
  };

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
          <TimelineHideButton id="Timeline" />
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
          <SearchInput
            handleClear={handleClear}
            onSubmit={handleSearch}
          />
        </div>
      </div>
      <div className="SideBar--bottom">
        <SpeechesContainer eventId={params.eventId} />
      </div>
    </div>
  );

  return (
    <SideBarContainer
      pullRight
      id="Timeline"
      sidebar={sideBarContent}
    >
      <Container>
        <Helmet title={title} />
        <EventContainer id={params.eventId} />
      </Container>
    </SideBarContainer>
  );
};

Event.propTypes = propTypes;

const stateToProps = (state, ownProps) => ({
  showVideo: shouldVideoShow(state),
  title: getEventTitle(state, ownProps),
  videoUrl: getVideoUrl(state, ownProps),
});

export default connect(
  stateToProps,
  dispatch => ({
    onSearchSpeeches: searchText => dispatch(createSearchAction('speeches')(searchText)),
    onSetEventTime: (eventId, time) => dispatch(setEventTime(eventId, time)),
    onToggleShowVideo: eventId => dispatch(toggleShowVideo(eventId)),
    resetSearchForm: () => dispatch(reset('searchLocalInput')),
  })
)(Event);

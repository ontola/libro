// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { reset } from 'redux-form';

import {
  setEventTime,
  toggleShowVideo,
} from 'state/events/actions';

import {
  Button,
  Container,
  SideBar,
} from 'components';

import SearchInput from 'containers/SearchInput';

import {
  getEventTitle,
  getVideoUrl,
  shouldVideoShow,
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
  resetSearchForm: PropTypes.func.isRequired,
  showVideo: PropTypes.bool,
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
            onSubmit={handleSearch}
            handleClear={handleClear}
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
      pullRight
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
  videoUrl: getVideoUrl(state, ownProps),
});

export default connect(
  stateToProps,
  dispatch => ({
    onToggleShowVideo: eventId => dispatch(toggleShowVideo(eventId)),
    onSetEventTime: (eventId, time) => dispatch(setEventTime(eventId, time)),
    onSearchSpeeches: searchText => dispatch(createSearchAction('speeches')(searchText)),
    resetSearchForm: () => dispatch(reset('searchLocalInput')),
  })
)(Event);

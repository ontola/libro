// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
  Container,
  SideBar,
} from 'components';

import { getEventTitle } from 'state/events/selectors';
import EventContainer from 'containers/EventContainer';
import SpeechesContainer from 'containers/SpeechesContainer';

const propTypes = {
  params: PropTypes.shape({
    eventId: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
};

const Event = ({
  params,
  title,
}) => {
  const sidebar = (
    <SpeechesContainer eventId={params.eventId} />
  );

  return (
    <SideBar
      sidebar={sidebar}
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
});

export default connect(stateToProps)(Event);

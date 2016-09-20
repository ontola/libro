// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
  Container,
} from 'components';

import { getEventTitle } from 'state/events/selectors';
import EventContainer from 'containers/EventContainer';

const propTypes = {
  params: PropTypes.shape({
    eventId: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
};

const Event = ({
  params,
  title,
}) => (
  <Container>
    <Helmet title={title} />
    <EventContainer eventId={params.eventId} />
  </Container>
);

Event.propTypes = propTypes;

const stateToProps = (state, ownProps) => ({
  title: getEventTitle(state, ownProps),
});

export default connect(stateToProps)(Event);

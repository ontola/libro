// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
  EventItem,
  Container,
  Heading,
  List,
} from 'components';

import { getEventTitle } from 'state/events/selectors';
import { getEventItems } from 'state/eventItems/selectors';
import EventContainer from 'containers/EventContainer';

const propTypes = {
  eventItems: PropTypes.array,
  params: PropTypes.shape({
    eventId: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
};

const defaultProps = {
  eventItems: [],
};

const renderEventItem = (data) => (
  <EventItem
    key={data.id}
    title={data.title}
    content={data.content}
  />
);

const Event = ({
  eventItems,
  params,
  title,
}) => (
  <Container>
    <Helmet title={title} />
    <EventContainer eventId={params.eventId} />
      {eventItems.length > 0 &&
        <List
          renderItem={renderEventItem}
          items={eventItems}
        />
      }
  </Container>
);

Event.defaultProps = defaultProps;
Event.propTypes = propTypes;

const stateToProps = (state, ownProps) => ({
  title: getEventTitle(state, ownProps),
  events: getEventItems(state, ownProps),
});

export default connect(stateToProps)(Event);

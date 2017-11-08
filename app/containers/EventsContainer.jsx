import Immutable from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { EventListItem, List } from '../components';
import EventContainer from 'containers/EventContainer';

import { getEvents } from 'state/events/selectors';
import { fetchEvents } from 'state/events/actions';

const propTypes = {
  events: PropTypes.instanceOf(Immutable.List),
  loadEvents: PropTypes.func.isRequired,
};

const defaultProps = {
  events: {},
};

const renderEventContainer = data => (
  <EventContainer
    eventId={data.id}
    key={data.id}
    renderItem={EventListItem}
  />
);

class EventsContainer extends Component {
  componentWillMount() {
    this.props.loadEvents();
  }

  render() {
    const { events } = this.props;
    return events.size > 0 && <List items={events} renderItem={renderEventContainer} />;
  }
}

EventsContainer.defaultProps = defaultProps;
EventsContainer.propTypes = propTypes;

export default connect(
  state => ({
    events: getEvents(state),
  }),
  dispatch => ({
    loadEvents: () => dispatch(fetchEvents()),
  })
)(EventsContainer);

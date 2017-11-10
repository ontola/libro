import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEvents } from 'state/events/actions';
import { getEvents } from 'state/events/selectors';
import EventContainer from 'containers/EventContainer';

import { EventListItem, List } from '../components';

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

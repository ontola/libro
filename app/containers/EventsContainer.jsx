import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { EventListItem, List } from 'components';
import { getEvents } from 'state/events/selectors';

import EventContainer from 'containers/EventContainer';
import Event from 'models/Event';

const propTypes = {
  events: PropTypes.object,
  loadEvents: PropTypes.func.isRequired,
};

const defaultProps = {
  events: {},
};

const renderEventContainer = (data) => (
  <EventContainer
    key={data.id}
    eventId={data.id}
    renderItem={EventListItem}
  />
);

class EventsContainer extends Component {
  componentWillMount() {
    this.props.loadEvents();
  }

  render() {
    const { events } = this.props;
    return events.size > 0 && <List renderItem={renderEventContainer} items={events} />;
  }
}

EventsContainer.defaultProps = defaultProps;
EventsContainer.propTypes = propTypes;

export default connect(
  state => ({
    events: getEvents(state),
  }),
  dispatch => ({
    loadEvents: () => { dispatch(Event.index()); },
  })
)(EventsContainer);

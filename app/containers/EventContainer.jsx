// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  EventShow,
} from 'components';

import { getEvent } from 'state/events/selectors';
import { expandAll } from 'state/collapsible/actions';
import { EventItemsContainer } from 'containers/EventItemsContainer';

const propTypes = {
  data: PropTypes.instanceOf(Event),
  eventId: PropTypes.string.isRequired,
  loadEvent: PropTypes.func.isRequired,
};

class EventContainer extends Component {
  componentWillMount() {
    const {
      data,
      eventId,
      loadEvent,
    } = this.props;

    if (data === undefined) {
      loadEvent(eventId);
    }
  }

  render() {
    return <EventShow {...this.props} />;
  }
}

EventContainer.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  const data = getEvent(state, ownProps);
  return {
    attendeesAbsent: data.attendeesAbsent,
    attendeesPresent: data.attendeesPresent,
    children: [data.eventItems.map(item => <EventItemsContainer id={item.id} />)],
    createdAt: data.createdAt,
    description: data.description,
    eventItems: data.eventItems,
    startDate: data.startDate,
  };
};

export default connect(
  mapStateToProps,
  (dispatch, { data }) => ({
    loadEvent: (id) => dispatch(Event.fetch(id)),
    expandAll: () => dispatch(expandAll(`event.${data.id}`)),
  })
)(EventContainer);

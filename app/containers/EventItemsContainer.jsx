// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getEventItems } from 'state/eventItems/selectors';
import {
  EventItem,
  List,
} from 'components';

const propTypes = {
  eventId: PropTypes.string.isRequired,
  eventItems: PropTypes.array.isRequired,
};

const defaultProps = {
  eventItems: [],
};

const renderItem = (eventItem) => (
  <EventItem
    key={eventItem.id}
    title={eventItem.title}
    eventId={eventItem.eventId}
    text={eventItem.text}
    elapsedTime={eventItem.integer}
    plannedTime={eventItem.integer}
    index={eventItem.integer}
  />
);

const EventItemsContainer = ({ eventItems }) => {
  if (eventItems.length > 0) {
    return (
      <List items={eventItems} renderItem={renderItem} />
    );
  }
  return false;
};

EventItemsContainer.propTypes = propTypes;
EventItemsContainer.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    eventItems: getEventItems(state, ownProps),
  })
)(EventItemsContainer);

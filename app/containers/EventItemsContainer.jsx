// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getEventItems } from 'state/eventItems/selectors';
import {
  EventItem,
  List,
} from 'components';

const propTypes = {
  motionId: PropTypes.string.isRequired,
  eventItems: PropTypes.array.isRequired,
};

const defaultProps = {
  eventItems: [],
};

const renderItem = (eventItem) => (
  <EventItem
    key={eventItem.id}
    title={eventItem.title}
    text={eventItem.text}
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

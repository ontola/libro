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

const renderItem = (arg) => (
  <EventItem
    key={arg.id}
    title={arg.title}
    content={arg.content}
  />
);

const EventItems = ({ eventItems }) => {
  if (eventItems.length > 0) {
    return (
      <List items={eventItems} renderItem={renderItem} />
    );
  }
  return false;
};

EventItems.propTypes = propTypes;
EventItems.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    eventItems: getEventItems(state, ownProps),
  })
)(EventItems);

// @flow
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import EventItem from 'models/EventItem';
import {
  EventItemShow,
} from '../components';

import { getEventItem } from 'state/eventItems/selectors';

const propTypes = {
  data: PropTypes.instanceOf(EventItem),
  eventId: PropTypes.string,
  id: PropTypes.string.isRequired,
};

const EventItemContainer = connect((state, ownProps) => {
  const data = getEventItem(state, ownProps);

  return {
    currentDate: data.createdAt,
    createdAt: data.createdAt,
    endDate: data.endDate,
    eventId: ownProps.eventId,
    id: data.id,
    index: data.index,
    startDate: data.startDate,
    text: data.description,
    title: data.title,
  };
})(EventItemShow);

EventItemContainer.propTypes = propTypes;

export default EventItemContainer;

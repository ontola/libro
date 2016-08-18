import { createSelector } from 'reselect';

export const getEvents = (state) => state.getIn(['events', 'items']);
export const getEventId = (state, props) => {
  if (props.params) {
    return props.params.eventId;
  }

  if (props.eventId) {
    return props.eventId;
  }

  return false;
};

export const getEvent = createSelector(
  [getEvents, getEventId],
  (events, id) => events.get(id)
);

export const getEventTitle = createSelector(
  [getEvents, getEventId],
  (events, id) => {
    if (events.get(id) === undefined) {
      return '';
    }
    return events.getIn([id, 'title']);
  }
);

export const getEventItemIds = createSelector(
  [getEvents, getEventId],
  (events, id) => {
    if (events.get(id) === undefined) {
      return '';
    }
    return events.getIn([id, 'eventItems']);
  }
);

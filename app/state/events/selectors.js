import { createSelector } from 'reselect';

export const getEvents = (state) => state.getIn(['events', 'items']);
export const getEventId = (state, props) => props.id;

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

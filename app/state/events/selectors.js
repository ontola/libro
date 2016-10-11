import { createSelector } from 'reselect';

export const getEvents = (state) =>
  state.getIn(['events', 'items']);

const getEventId = (state, props) => props.id;

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

export const getEventSpeechIds = (id) => (state) => {
  const ids = state.getIn(['events', 'items', id, 'speeches']);
  if (ids === undefined) {
    return [];
  }
  return ids;
};

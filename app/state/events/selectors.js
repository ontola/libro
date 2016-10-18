import { createSelector } from 'reselect';

export const getEvents = state =>
  state.getIn(['events', 'items']);

const getEventId = (state, props) => {
  if (props.params !== undefined) {
    return props.params.eventId;
  }

  if (props.id !== undefined) {
    return props.id;
  }

  return null;
};

export const getEvent = createSelector(
  [getEvents, getEventId],
  (events, id) => events.get(id)
);

export const getEventTitle = createSelector(
  [getEvents, getEventId],
  (events, id) => {
    if (events.get(id) === undefined) {
      return 'Loading title...';
    }
    return events.getIn([id, 'name']);
  }
);

export const getVideoUrl = createSelector(
  [getEvents, getEventId],
  (events, id) => {
    if (events.get(id) === undefined) {
      return '';
    }
    return events.getIn([id, 'video']);
  }
);

export const getEventSpeechIds = id => (state) => {
  const ids = state.getIn(['events', 'items', id, 'speeches']);
  if (ids === undefined) {
    return [];
  }
  return ids;
};

export const shouldVideoShow = state => state.getIn(['events', 'showVideo']);

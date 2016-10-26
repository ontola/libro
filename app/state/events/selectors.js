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

  if (props.eventId !== undefined) {
    return props.eventId;
  }

  return null;
};

export const getEvent = (state, props) =>
  state.getIn(['events', 'items', getEventId(state, props)]);

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

export const getEventSpeechIds = createSelector(
  [getEvent],
  (event) => {
    if (event === undefined) {
      return [];
    }
    const ids = event.get('speeches');
    return ids;
  }
);

export const shouldVideoShow = state => state.getIn(['events', 'showVideo']);

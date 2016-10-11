import { createSelector } from 'reselect';

export const getSpeeches = (state) =>
  state.getIn(['speeches', 'items']);

const getSpeechId = (state, props) => props.id;

const getEventId = (state, props) => props.eventId;

export const getSpeech = createSelector(
  [getSpeeches, getSpeechId],
  (speeches, id) => speeches.get(id)
);

export const getSpeechesByEvent = createSelector(
  [getEventId, getSpeeches],
  (eventId, speeches) =>
    speeches.filter(speech => speech.eventId === eventId)
);

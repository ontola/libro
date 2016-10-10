import { createSelector } from 'reselect';

export const getSpeeches = (state) =>
  state.getIn(['speeches', 'items']);

const getSpeechId = (state, props) => props.id;

export const getSpeech = createSelector(
  [getSpeeches, getSpeechId],
  (speeches, id) => speeches.get(id)
);

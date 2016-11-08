import { createSelector } from 'reselect';
import { getSearchSelectors } from 'redux-search';
import { getEventSpeechIds } from 'state/events/selectors';

export const getSpeeches = state =>
  state.getIn(['speeches', 'items']);

const getSpeechId = (state, props) => props.id;

export const getSpeech = createSelector(
  [getSpeeches, getSpeechId],
  (speeches, id) => speeches.get(id)
);

export const {
  /** Input of the query */
  text,
  /** Array of IDs of content that matches the query */
  result,
} = getSearchSelectors({
  resourceName: 'speeches',
  resourceSelector: (resourceName, state) => state.getIn([resourceName, 'items']),
  searchStateSelector: state => state.get('search'),
});

export const getFilteredSpeechesForEvent = createSelector(
  [getEventSpeechIds, result],
  (eventSpeeches, resultSpeeches) =>
    eventSpeeches.filter(speech => resultSpeeches.indexOf(speech) >= 0)
);

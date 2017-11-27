import { handleActions } from 'redux-actions';
import { List, Map } from 'immutable';

import {
  increaseValue,
  updateRecordValue,
} from 'helpers/reducers';

import {
  VOTE_MATCH_ADD_VOTEABLE,
  VOTE_MATCH_INIT,
  VOTE_MATCH_NEXT,
  VOTE_MATCH_REMOVE_VOTEABLE,
  VOTE_MATCH_SAVE,
  VOTE_MATCH_TRANSITION_TO,
  VOTE_MATCH_UPDATE_VOTEABLES,
} from '../action-types';

const initialState = new Map({
  currentIndex: null,
  currentVoteMatch: null,
  items: new Map({
    LocalVoteMatch: new Map({
      voteables: new List(),
    }),
  }),
});

const voteMatch = handleActions({
  [VOTE_MATCH_ADD_VOTEABLE]: (state, { payload }) =>
    state.updateIn(
      ['items', payload.id, 'voteables'],
      voteables => voteables.push(payload.voteable)
    ),

  [VOTE_MATCH_INIT]: (state, { payload }) => state.withMutations(s => s
    .set('currentVoteMatch', payload.id)
    .set('currentIndex', 0)),

  [VOTE_MATCH_NEXT]: state =>
    increaseValue(state, 'currentIndex'),

  [VOTE_MATCH_REMOVE_VOTEABLE]: (state, { payload }) =>
    state.updateIn(
      ['items', payload.id, 'voteables'],
      voteables => voteables.filter(voteable => voteable !== payload.voteable)
    ),

  [VOTE_MATCH_SAVE]: (state, { payload }) =>
    updateRecordValue(state, payload.id, 'similarity', payload.similarity),

  [VOTE_MATCH_TRANSITION_TO]: (state, { payload }) =>
    state.set('currentIndex', payload.id),

  [VOTE_MATCH_UPDATE_VOTEABLES]: (state, { payload }) =>
    updateRecordValue(state, payload.id, 'voteables', payload.voteables),
}, initialState);

export default voteMatch;

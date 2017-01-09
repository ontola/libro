import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import {
  increaseValue,
  updateRecordValue,
  setRecord,
} from 'helpers/reducers';

import VoteMatch from 'models/VoteMatch';

import {
  VOTE_MATCH_INIT,
  VOTE_MATCH_NEXT,
  VOTE_MATCH_SAVE,
  GET_VOTE_MATCH,
} from '../action-types';

const initialState = new Map({
  currentIndex: 0,
  currentVoteMatch: null,
  items: new Map(),
});

// const newRecord = id => new VoteMatch({
//   id,
// });

const voteMatch = handleActions({
  [GET_VOTE_MATCH]: (state, { payload }) =>
    setRecord(state, payload.record, payload.id, VoteMatch),

  [VOTE_MATCH_INIT]: (state, { payload }) => state.withMutations(s => s
    .set('currentVoteMatch', payload.id)
    .set('currentIndex', 0)
  ),

  [VOTE_MATCH_NEXT]: state =>
    increaseValue(state, 'currentIndex'),

  [VOTE_MATCH_SAVE]: (state, { payload }) =>
    updateRecordValue(state, payload.id, 'similarity', payload.similarity),

}, initialState);

export default voteMatch;

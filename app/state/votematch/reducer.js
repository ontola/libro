import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import {
  increaseValue,
  updateRecordValue,
} from 'helpers/reducers';

import VoteMatch from 'models/VoteMatch';

import {
  VOTE_MATCH_INIT,
  VOTE_MATCH_NEXT,
  VOTE_MATCH_SAVE,
} from '../action-types';

const initialState = new Map({
  currentIndex: 0,
  currentVoteMatch: null,
  items: new Map(),
});

const motions = [
  '6117dd10-2cf8-e511-9672-e4115babb880',
  '169b7429-14f8-e511-9672-e4115babb880',
  '2ea244f5-14f8-e511-9672-e4115babb880',
  '6717dd10-2cf8-e511-9672-e4115babb880',
  'c0e2a617-79f2-e511-9672-e4115babb880',
  '3137bf58-89f5-e511-9672-e4115babb880',
];

// NOTE: This is mock data. Eventually this data should be fetched by the api
const newRecord = id => new VoteMatch({
  id,
  motions,
});

const votematch = handleActions({
  [VOTE_MATCH_INIT]: (state, { payload }) => state.withMutations(s => s
    .setIn(['items', payload.id], newRecord(payload.id))
    .set('currentVoteMatch', payload.id)
    .set('currentIndex', 0)
  ),

  [VOTE_MATCH_NEXT]: state =>
    increaseValue(state, 'currentIndex'),

  [VOTE_MATCH_SAVE]: (state, { payload }) =>
    updateRecordValue(state, payload.id, 'similarity', payload.similarity),

}, initialState);

export default votematch;

import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import VoteMatch from 'models/VoteMatch';
import { VOTE_MATCH_INIT, VOTE_MATCH_NEXT } from '../action-types';

const initialState = new Map({
  currentIndex: null,
  currentVoteMatch: null,
  items: new Map(),
});

const motions = [
  '6117dd10-2cf8-e511-9672-e4115babb880',
  '169b7429-14f8-e511-9672-e4115babb880',
  '2ea244f5-14f8-e511-9672-e4115babb880',
];

// NOTE: This is mock data. Eventually this data should be fetched by the api
const newRecord = (id) => new VoteMatch({
  id,
  motions,
  comparedProfile: id,
  comparedProfilePositions: ['pro', 'con', 'neutral'],
});

const increaseByOne = index => (index === null ? 0 : index + 1);

const votematch = handleActions({
  [VOTE_MATCH_INIT]: (state, { payload }) => state
    .setIn(['items', payload.id], newRecord(payload.id))
    .set('currentVoteMatch', payload.id)
    .set('currentIndex', null),

  [VOTE_MATCH_NEXT]: (state) =>
    state.set('currentIndex', increaseByOne(state.get('currentIndex'))),

}, initialState);

export default votematch;

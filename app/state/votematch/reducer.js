import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import {
  VOTE_MATCH_INIT,
  VOTE_MATCH_NEXT,
} from '../action-types';

const initialState = new Map({
  compareWithPerson: '',
  currentIndex: null,
  motionIds: [],
});

const increaseByOne = index => (index === null ? 0 : index + 1);

const votematch = handleActions({
  [VOTE_MATCH_INIT]: (state, { payload }) =>
    state.merge(payload),
  [VOTE_MATCH_NEXT]: (state) =>
    state.set('currentIndex', increaseByOne(state.get('currentIndex'))),
}, initialState);

export default votematch;

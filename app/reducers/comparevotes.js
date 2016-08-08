import { Map } from 'immutable';
import { VOTE_MATCH_NEXT, VOTE_MATCH_START } from '../constants/actionTypes';

const initialState = new Map({
  compareWithPerson: '',
  currentIndex: null,
  motionIds: [],
});

const increaseByOne = (index) => (index === null ? 0 : index + 1);

const compareVotes = (state = initialState, action) => {
  switch (action.type) {
    case VOTE_MATCH_START:
      return state.merge(action.payload);
    case VOTE_MATCH_NEXT:
      return state.set('currentIndex', increaseByOne(state.get('currentIndex')));
    default:
      return state;
  }
};

export default compareVotes;

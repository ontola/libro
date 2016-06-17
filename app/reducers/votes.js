import { handleAction, handleActions } from 'redux-actions';
// import { UPDATE_VOTE_TALLY } from '../constants/actionTypes';
import { updateVoteTally } from '../actions/votes';

const initialState = {
  counter: 0
};

const votes = handleActions({
  [updateVoteTally]: (state, action) => {
    console.log(action)
    return {
      counter: state.counter + action.payload
    };
  }
}, initialState);

// const votes = (state = initialState, action) => {
//   switch (action.type) {
//     case UPDATE_VOTE_TALLY:
//       return Object.assign({}, state, {
//         items: [
//           {
//             id: action.payload.id,
//           }
//         ]
//       });
//
//     default:
//       return state;
//   }
// };

export default votes;

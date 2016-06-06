import { FETCH_MOTIONS, FETCH_POLITICIANS } from '../actions/appData';

function appData(state = [], action) {
  switch (action.type) {
    case 'FETCH_MOTIONS':
      return Object.assign({}, state, {
        motions: action.data,
      });
    case 'FETCH_POLITICIANS':
      return Object.assign({}, state, {
        politicians: action.data,
      });
    default:
      return state;
  }
}

export default appData;

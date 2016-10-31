import { GET_CURRENT_ACTOR } from '../action-types';
import CurrentActor from 'models/CurrentActor';

const initialState = new CurrentActor();

export default function currentActors(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_ACTOR: {
      if (action.payload.loading === true) {
        return state;
      }
      return action.payload.record;
    }
    default: {
      return state;
    }
  }
}

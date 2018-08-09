import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import { LOCATION_CHANGE } from 'connected-react-router';

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null,
});

const router = handleActions({
  [LOCATION_CHANGE]: (state, { payload }) => state.merge({
    locationBeforeTransitions: payload,
  }),
}, initialState);

export default router;

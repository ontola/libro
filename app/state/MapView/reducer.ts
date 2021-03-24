import { handleActions } from 'redux-actions';

import * as actions from './actions';

export const MapReducerKey = 'MapView';

const initialState = {
  accessToken: '',
  error: undefined,
  expiresAt: '',
};

const reducer = handleActions({
  [actions.MAP_SET_ACCESS_TOKEN]: (state, { payload }) => ({
    ...state,
    accessToken: payload.accessToken,
    error: payload.error,
    expiresAt: payload.expiresAt,
  }),
}, initialState);

export default reducer;

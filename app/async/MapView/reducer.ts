import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import * as actions from './actions';

export const MapReducerKey = 'MapView';

const initialState = new (Map as any)({
  accessToken: '',
  error: undefined,
  expiresAt: '',
});

const reducer = handleActions({
  [actions.MAP_SET_ACCESS_TOKEN]: (state, { payload }) => state
    .set('accessToken', payload.accessToken)
    .set('error', payload.error)
    .set('expiresAt', payload.expiresAt),
}, initialState);

export default reducer;

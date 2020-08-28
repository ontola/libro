import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import { AFE_API_STORE_ASSET } from '../action-types';

const initialState = new Map({});

const collapsible = handleActions({
  [AFE_API_STORE_ASSET]: (state, { payload }) => (
    state.set(payload.file, payload.json)
  ),
}, initialState);

export default collapsible;

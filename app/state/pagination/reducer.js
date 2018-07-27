import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { GOTO_PAGE } from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const motions = handleActions({
  [GOTO_PAGE]: (state, { payload }) =>
    state.setIn(['items', payload.collectionIRI], payload.page),
}, initialState);

export default motions;

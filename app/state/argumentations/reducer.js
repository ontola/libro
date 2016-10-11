import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { Argument } from 'models';
import { setRecord } from 'helpers/reducers';
import { GET_ARGUMENT } from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const argumentations = handleActions({
  [GET_ARGUMENT]: (state, { payload }) =>
    setRecord(state, payload.record, payload.id, Argument),
}, initialState);

export default argumentations;

import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { setRecord } from 'helpers/reducers';
import { Argument } from 'models';

import {
  GET_ARGUMENT,
} from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const argumentations = handleActions({
  [GET_ARGUMENT]: (state, { payload }) =>
    setRecord(state, payload.record, payload.id, Argument),
}, initialState);

export default argumentations;

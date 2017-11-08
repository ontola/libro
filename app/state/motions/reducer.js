import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import { Motion } from 'models';
import { setRecord } from 'helpers/reducers';

import { GET_MOTION } from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const motions = handleActions({
  [GET_MOTION]: (state, { payload }) =>
    setRecord(state, payload.record, payload.id, Motion),
}, initialState);

export default motions;

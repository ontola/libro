import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { setRecord } from 'helpers/reducers';
import { GET_EVENT_ITEM } from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const eventItems = handleActions({
  [GET_EVENT_ITEM]: (state, { payload }) =>
    setRecord(state, payload.record, payload.id),
}, initialState);

export default eventItems;

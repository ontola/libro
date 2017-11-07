import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { setRecord } from 'helpers/reducers';
import {
  GET_EVENT,
  SET_EVENT_TIME,
  TOGGLE_SHOW_VIDEO,
} from '../action-types';

const initialState = new Map({
  items: new Map(),
  showVideo: false,
});

const events = handleActions({
  [GET_EVENT]: (state, { payload }) =>
    setRecord(state, payload.record, payload.id),

  [SET_EVENT_TIME]: (state, { payload }) =>
    state.set('eventTime', payload),

  [TOGGLE_SHOW_VIDEO]: state =>
    state.set('showVideo', !state.get('showVideo')),
}, initialState);

export default events;

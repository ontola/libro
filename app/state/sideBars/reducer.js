import { Map, Record } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  setRecord,
  updateRecordValue,
} from 'helpers/reducers';
import {
  SIDEBAR_ADD,
  SIDEBAR_CLOSE,
  SIDEBAR_DOCK,
  SIDEBAR_OPEN,
  SIDEBAR_UNDOCK,
} from 'state/action-types';

export const SideBar = Record({
  docked: false,
  id: undefined,
  opened: false,
});

const initialState = new Map({
  items: new Map(),
});

const recordCollapsible = ({ id }) =>
  new SideBar({ id });

const sideBars = handleActions({
  [SIDEBAR_ADD]: (state, { payload }) =>
    setRecord(state, recordCollapsible(payload), payload.id),
  [SIDEBAR_CLOSE]: (state, { payload }) =>
    updateRecordValue(state, payload, 'opened', false),
  [SIDEBAR_DOCK]: (state, { payload }) =>
    updateRecordValue(state, payload, 'docked', true),
  [SIDEBAR_OPEN]: (state, { payload }) =>
    updateRecordValue(state, payload, 'opened', true),
  [SIDEBAR_UNDOCK]: (state, { payload }) =>
    updateRecordValue(state, payload, 'docked', false),
}, initialState);

export default sideBars;

import { Map, Record } from 'immutable';
import { handleActions } from 'redux-actions';

import { colors } from '../../components/shared/config';
import {
  setRecord,
  updateRecordValue,
} from '../../helpers/reducers';
import {
  SIDEBAR_ADD,
  SIDEBAR_CLOSE,
  SIDEBAR_DOCK,
  SIDEBAR_OPEN,
  SIDEBAR_SET_BASE_COLOR,
  SIDEBAR_UNDOCK,
} from "../action-types";

export const SideBar = Record({
  docked: false,
  id: undefined,
  opened: false,
});

const initialState = new Map({
  baseColor: colors.blue.base,
  items: new Map(),
});

const closeSidebar = (state, sidebarName) => updateRecordValue(state, sidebarName, 'opened', false);

const recordCollapsible = ({ id, docked }) =>
  new SideBar({ docked, id });

const sideBars = handleActions({
  '@@router/LOCATION_CHANGE': state => closeSidebar(state, 'Navbar'),
  [SIDEBAR_ADD]: (state, { payload }) =>
    setRecord(state, recordCollapsible(payload), payload.id),
  [SIDEBAR_CLOSE]: (state, { payload }) => closeSidebar(state, payload),
  [SIDEBAR_DOCK]: (state, { payload }) =>
    updateRecordValue(state, payload, 'docked', true),
  [SIDEBAR_OPEN]: (state, { payload }) =>
    updateRecordValue(state, payload, 'opened', true),
  [SIDEBAR_SET_BASE_COLOR]: (state, { payload }) =>
    state.set('baseColor', payload),
  [SIDEBAR_UNDOCK]: (state, { payload }) =>
    updateRecordValue(state, payload, 'docked', false),
}, initialState);

export default sideBars;

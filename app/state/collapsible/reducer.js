import { Map, Record } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  setRecord,
  toggleValue,
} from '../../helpers/reducers';
import {
  COLL_ADD,
  COLL_CLOSE_ONE,
  COLL_TOGGLE_ONE,
} from '../action-types';

export const Collapsible = Record({
  group: undefined,
  opened: false,
});

const initialState = new Map({
  items: new Map(),
});

const closeGroup = (state, group) => {
  const modifiedItems = state
    .get('items')
    .filter((item) => item.get('group') === group)
    .map((item) => item.set('opened', false));

  return state.mergeIn(['items'], modifiedItems);
};

const recordCollapsible = ({ startOpened }) => new Collapsible({
  opened: startOpened,
});

const closeOne = (state, payload) => state.setIn(['items', payload.identifier, 'opened'], false);

const collapsible = handleActions({
  '@@router/LOCATION_CHANGE': (state) => closeGroup(state, 'Navbar'),

  [COLL_ADD]: (state, { payload }) => setRecord(
    state,
    recordCollapsible(payload),
    payload.identifier
  ),

  [COLL_CLOSE_ONE]: (state, { payload }) => closeOne(state, payload, 'opened'),

  [COLL_TOGGLE_ONE]: (state, { payload }) => toggleValue(state, payload, 'opened'),

}, initialState);

export default collapsible;

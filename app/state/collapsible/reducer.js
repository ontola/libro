import { Map, Record } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  setRecord,
  toggleValue,
} from '../../helpers/reducers';
import {
  COLL_ADD,
  COLL_CLOSE_ONE,
  COLL_OPEN_GROUPED,
  COLL_TOGGLE_GROUP,
  COLL_TOGGLE_ONE,
} from '../action-types';

export const Collapsible = Record({
  group: undefined,
  opened: false,
});

const initialState = new Map({
  items: new Map(),
});

// Opens all collapsibles if one or more in the group are currently closed
// The group should be a string preferably formatted as 'type_id', e.g. 'event_292104-247914'
const toggleAll = (state, group) => {
  let shouldOpen = false;

  const items = state.get('items').map((coll) => {
    if (coll.group !== group) {
      return coll;
    }

    if (coll.opened === false) {
      shouldOpen = true;
    }

    return coll.set('opened', true);
  });

  if (shouldOpen) {
    return state.set('items', items);
  }

  return state.set('items', state.get('items').map((coll) => coll.set('opened', false)));
};

const closeGroup = (state, group) => {
  const modifiedItems = state
    .get('items')
    .filter((item) => item.get('group') === group)
    .map((item) => item.set('opened', false));

  return state.mergeIn(['items'], modifiedItems);
};

const recordCollapsible = ({ group, startOpened }) => new Collapsible({
  group,
  opened: startOpened,
});

const openOne = (state, payload) => state.setIn(['items', payload.identifier, 'opened'], true);

const closeOne = (state, payload) => state.setIn(['items', payload.identifier, 'opened'], false);

const collapsible = handleActions({
  '@@router/LOCATION_CHANGE': (state) => closeGroup(state, 'Navbar'),

  [COLL_ADD]: (state, { payload }) => setRecord(
    state,
    recordCollapsible(payload),
    payload.identifier
  ),

  [COLL_CLOSE_ONE]: (state, { payload }) => closeOne(state, payload, 'opened'),

  [COLL_OPEN_GROUPED]: (state, { payload }) => openOne(closeGroup(state, payload.group), payload),

  [COLL_TOGGLE_GROUP]: (state, { payload }) => toggleAll(state, payload.group),

  [COLL_TOGGLE_ONE]: (state, { payload }) => toggleValue(state, payload, 'opened'),

}, initialState);

export default collapsible;

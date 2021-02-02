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

const initialState = new (Map as any)({
  items: new (Map as any)(),
});

// Opens all collapsibles if one or more in the group are currently closed
// The group should be a string preferably formatted as 'type_id', e.g. 'event_292104-247914'
const toggleAll = (state: any, group: any) => {
  let shouldOpen = false;

  const items = state.get('items').map((coll: any) => {
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

  return state.set('items', state.get('items').map((coll: any) => coll.set('opened', false)));
};

const closeGroup = (state: any, group: any) => {
  const modifiedItems = state
    .get('items')
    .filter((item: any) => item.get('group') === group)
    .map((item: any) => item.set('opened', false));

  return state.mergeIn(['items'], modifiedItems);
};

const recordCollapsible = ({ group, startOpened }: any) => new Collapsible({
  group,
  opened: startOpened,
});

const openOne = (state: any, payload: any) => state.setIn(['items', payload.identifier, 'opened'], true);

const closeOne = (state: any, payload: any) => state.setIn(['items', payload.identifier, 'opened'], false);

const collapsible = handleActions({
  '@@router/LOCATION_CHANGE': (state) => closeGroup(state, 'Navbar'),

  [COLL_ADD]: (state, { payload }) => setRecord(
    state,
    recordCollapsible(payload),
    payload.identifier,
  ),

  [COLL_CLOSE_ONE]: (state, { payload }) => closeOne(state, payload),

  [COLL_OPEN_GROUPED]: (state, { payload }) => openOne(closeGroup(state, payload.group), payload),

  [COLL_TOGGLE_GROUP]: (state, { payload }) => toggleAll(state, payload.group),

  [COLL_TOGGLE_ONE]: (state, { payload }) => toggleValue(state, payload, 'opened'),

}, initialState);

export default collapsible;

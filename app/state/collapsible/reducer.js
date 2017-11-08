import { Map, Record } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  setRecord,
  toggleValue,
} from 'helpers/reducers';
import {
  COLL_ADD,
  COLL_TOGGLE_GROUP,
  COLL_TOGGLE_ONE,
} from 'state/action-types';

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

  return state.set('items', state.get('items').map(coll =>
    coll.set('opened', false)));
};

const recordCollapsible = ({ group, startOpened }) =>
  new Collapsible({ group, opened: startOpened });

const collapsible = handleActions({
  [COLL_ADD]: (state, { payload }) =>
    setRecord(state, recordCollapsible(payload), payload.identifier),

  [COLL_TOGGLE_GROUP]: (state, { payload }) =>
    toggleAll(state, payload.group),

  [COLL_TOGGLE_ONE]: (state, { payload }) =>
    toggleValue(state, payload, 'opened'),
}, initialState);

export default collapsible;

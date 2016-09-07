import { handleActions } from 'redux-actions';
import { Map, Record } from 'immutable';

import {
  COLL_ADD,
  COLL_REMOVE,
  COLL_TOGGLE_ONE,
  COLL_TOGGLE_GROUP,
} from 'state/action-types';

const Collapsible = Record({
  id: '',
  group: '',
  opened: true,
});

const initialState = new Map({
  items: new Map({}),
});

function updateRecord(state, id, key, value) {
  return state.setIn(
    ['items', id],
    state.getIn(['items', id]).set(key, value)
  );
}

// Opens all collapsibles if one or more in the group are currently closed
function toggleAll(state, group) {
  let shouldOpen = false;
  const items = state.items.map(coll => {
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
  return state.set(
    'items',
    state.get('items').map(coll => coll.set('opened', false))
  );
}

const collapsible = handleActions({
  [COLL_ADD]: (state, { payload }) => state.set('items', new Collapsible(payload)),
  [COLL_REMOVE]: (state, { payload }) => state.set('items', state.get('items').delete(payload.id)),
  [COLL_TOGGLE_ONE]: (state, { payload }) => updateRecord(
    state,
    payload.id,
    'opened',
    state.getIn(['items', payload.id]).opened
  ),
  [COLL_TOGGLE_GROUP]: (state, { payload }) => toggleAll(state, payload.group),
}, initialState);

export default collapsible;

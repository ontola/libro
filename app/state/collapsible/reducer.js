import { handleActions } from 'redux-actions';
import { Map, Record } from 'immutable';

import {
  deleteRecord,
  setRecord,
  toggleValue,
} from 'helpers/reducers';

import {
  COLL_ADD,
  COLL_REMOVE,
  COLL_TOGGLE_ONE,
  COLL_TOGGLE_GROUP,
} from 'state/action-types';

const Collapsible = Record({
  group: undefined,
  opened: false,
});

const initialState = new Map({
  items: new Map(),
});

// Opens all collapsibles if one or more in the group are currently closed
const toggleAll = (state, group) => {
  let shouldOpen = false;

  const items = state.get('items').map(coll => {
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
    coll.set('opened', false)
  ));
};

const recordCollapsible = ({ group, startOpened }) =>
  new Collapsible({ group, opened: startOpened });

const collapsible = handleActions({
  [COLL_ADD]: (state, { payload }) =>
    setRecord(state, recordCollapsible(payload), payload.identifier),

  [COLL_REMOVE]: (state, { payload }) =>
    deleteRecord(state, payload.id),

  [COLL_TOGGLE_ONE]: (state, { payload }) =>
    toggleValue(state, payload.id, 'opened'),

  [COLL_TOGGLE_GROUP]: (state, { payload }) =>
    toggleAll(state, payload.group),
}, initialState);

export default collapsible;

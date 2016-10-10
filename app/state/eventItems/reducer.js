import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import EventItem from 'models/EventItem';

import {
  GET_EVENT_ITEM,
} from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const newEventItemUnlessExists = (state, id) => {
  const record = state.getIn(['items', id]);
  return record !== undefined ? record : new EventItem({ id, loading: true });
};

const eventItems = handleActions({
  [GET_EVENT_ITEM]: (state, { payload }) => {
    const record = payload.record || newEventItemUnlessExists(state, payload.id);

    // This may be a bad idea.
    // if (error) {
    //   return state.deleteIn(['items', payload.id]);
    // }

    return state.setIn(['items', record.id], record);
  },
}, initialState);

export default eventItems;

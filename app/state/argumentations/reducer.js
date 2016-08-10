import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import Argument from '../../models/Argument';
import {
  GET_ARGUMENT,
} from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const newArgumentUnlessExists = (state, id) => {
  const record = state.getIn(['items', id]);
  return record !== undefined ? record : new Argument({ id });
};

let record;

const argumentations = handleActions({
  [GET_ARGUMENT]: (state, { payload }) => {
    record = payload.record || newArgumentUnlessExists(state, payload.id);
    return state.setIn(['items', record.id], record);
  },
}, initialState);

export default argumentations;

import { Map } from 'immutable';
import * as actions from '../constants/actionTypes';
import { apiModelGenerator } from './helpers/apiModelGenerator';

const Argument = apiModelGenerator({
  id: null,
  title: '',
  text: '',
  side: '',
  created_at: '',
  vote_count: null,
}, {
  actions: new Map({
    collection: actions.GET_ARGUMENTS,
    resource: actions.GET_ARGUMENT,
  }),
  endpoint: 'arguments',
  type: 'argument',
});

export default Argument;

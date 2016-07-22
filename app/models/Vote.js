import { Map } from 'immutable';
import * as actions from '../constants/actionTypes';
import { apiModelGenerator } from './helpers/apiModelGenerator';

const Vote = apiModelGenerator({
  id: null,
  individual: false,
  value: '',
}, {
  actions: new Map({
    collection: actions.GET_VOTES,
    resource: actions.GET_VOTE,
  }),
  endpoint: 'votes',
  type: 'vote',
});

export default Vote;

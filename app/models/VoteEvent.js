import { Map } from 'immutable';
import * as actions from '../constants/actionTypes';
import { apiModelGenerator } from './helpers/apiModelGenerator';

const VoteEvent = apiModelGenerator({
  id: null,
  result: '',
  counts: [],
  votes: [],
}, {
  actions: new Map({
    collection: actions.GET_VOTE_EVENTS,
    resource: actions.GET_VOTE_EVENT,
  }),
  endpoint: 'vote_events',
  type: 'vote_event',
});

export default VoteEvent;

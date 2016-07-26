import { Map } from 'immutable';
import * as actions from '../constants/actionTypes';
import { APIDesc, apiModelGenerator } from '../helpers/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_VOTE_EVENTS,
    resource: actions.GET_VOTE_EVENT,
  }),
  endpoint: 'vote_events',
  type: 'vote_event',
});

const attributes = {
  id: null,
  result: '',
  counts: [],
  votes: [],
};

export default apiModelGenerator(attributes, apiDesc);

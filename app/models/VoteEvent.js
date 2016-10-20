import { Map } from 'immutable';
import * as actions from '../state/action-types';
import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_VOTE_EVENTS,
    resource: actions.GET_VOTE_EVENT,
  }),
  endpoint: 'vote_events',
  type: 'vote_events',
});

const attributes = {
  counts: [],
  endDate: new Date(),
  id: '',
  result: '',
  startDate: new Date(),
  votes: [],
};

export default apiModelGenerator(attributes, apiDesc);

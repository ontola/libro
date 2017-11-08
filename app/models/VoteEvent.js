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
  endDate: null,
  id: '',
  legislativeSession: '',
  optionCounts: {},
  organization: '',
  result: '',
  startDate: null,
  votes: [],
};

export default apiModelGenerator(attributes, apiDesc);

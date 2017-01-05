import { Map } from 'immutable';
import * as actions from '../state/action-types';
import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_VOTE_MATCHES,
    resource: actions.GET_VOTE_MATCH,
  }),
  endpoint: 'vote_matches',
  type: 'voteMatches',
});

const attributes = {
  comparables: [],
  voteables: [],
  createdAt: null,
  updatedAt: null,
  id: null,
  similarity: null,
  name: '',
  text: '',
};

export default apiModelGenerator(attributes, apiDesc);

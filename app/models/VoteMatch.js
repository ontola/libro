import { Map } from 'immutable';
import * as actions from '../state/action-types';
import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_VOTE_MATCH,
    resource: actions.GET_VOTE_MATCHES,
  }),
  endpoint: 'vote_match',
  type: 'vote_match',
});

const attributes = {
  id: null,
  motions: [],
  comparedProfile: null,
  comparedProfilePositions: [],
  similarity: null,
};

export default apiModelGenerator(attributes, apiDesc);

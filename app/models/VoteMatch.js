import { Map } from 'immutable';

import { FRONTEND_URL } from '../config';
import * as actions from '../state/action-types';

import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_VOTE_MATCHES,
    resource: actions.GET_VOTE_MATCH,
    create: actions.CREATE_VOTE_MATCH,
  }),
  endpoint: `${FRONTEND_URL}/vote_matches`,
  type: 'voteMatches',
  arguModel: true,
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

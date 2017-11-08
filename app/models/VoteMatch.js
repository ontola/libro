import { Map } from 'immutable';

import { FRONTEND_URL } from '../config';
import * as actions from '../state/action-types';

import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_VOTE_MATCHES,
    create: actions.CREATE_VOTE_MATCH,
    resource: actions.GET_VOTE_MATCH,
  }),
  arguModel: true,
  endpoint: `${FRONTEND_URL}/vote_matches`,
  type: 'voteMatches',
});

const attributes = {
  comparables: [],
  createdAt: null,
  id: null,
  name: '',
  similarity: null,
  text: '',
  updatedAt: null,
  voteables: [],
};

export default apiModelGenerator(attributes, apiDesc);

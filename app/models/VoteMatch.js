import { Map } from 'immutable';

import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

import { FRONTEND_HOSTNAME } from '../config';
import * as actions from '../state/action-types';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_VOTE_MATCHES,
    resource: actions.GET_VOTE_MATCH,
    create: actions.CREATE_VOTE_MATCH,
  }),
  endpoint: `${FRONTEND_HOSTNAME}/vote_matches`,
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

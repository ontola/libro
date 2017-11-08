import { Map } from 'immutable';

import * as actions from '../state/action-types';

import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_MOTIONS,
    resource: actions.GET_MOTION,
  }),
  endpoint: 'motions',
  type: 'motions',
});

const attributes = {
  arguments: [],
  classification: 'Motie',
  createdAt: new Date(),
  creator: '',
  id: '',
  loading: false,
  status: '',
  text: '',
  title: '',
  voteEvents: [],
};

export default apiModelGenerator(attributes, apiDesc);

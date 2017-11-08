import { Map } from 'immutable';

import * as actions from '../state/action-types';

import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_ARGUMENTS,
    create: actions.CREATE_ARGUMENT,
    resource: actions.GET_ARGUMENT,
  }),
  endpoint: 'arguments',
  type: 'arguments',
});

const attributes = {
  createdAt: null,
  creator: '',
  id: '',
  motionId: '',
  name: '',
  side: '',
  text: '',
  voteCount: '',
};

export default apiModelGenerator(attributes, apiDesc);

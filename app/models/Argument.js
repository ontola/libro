import { Map } from 'immutable';
import * as actions from '../state/action-types';
import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_ARGUMENTS,
    resource: actions.GET_ARGUMENT,
    create: actions.CREATE_ARGUMENT,
  }),
  endpoint: 'arguments',
  type: 'arguments',
});

const attributes = {
  id: '',
  motionId: '',
  name: '',
  text: '',
  side: '',
  createdAt: null,
  voteCount: '',
  creator: '',
};

export default apiModelGenerator(attributes, apiDesc);

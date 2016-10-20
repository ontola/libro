import { Map } from 'immutable';
import * as actions from '../state/action-types';
import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_ARGUMENTS,
    resource: actions.GET_ARGUMENT,
  }),
  endpoint: 'arguments',
  type: 'arguments',
});

const attributes = {
  id: '',
  motionId: '',
  title: '',
  content: '',
  side: '',
  createdAt: new Date(),
  voteCount: '',
  creator: '',
};

export default apiModelGenerator(attributes, apiDesc);

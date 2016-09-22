import { Map } from 'immutable';
import * as actions from '../state/action-types';
import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_VOTES,
    resource: actions.GET_VOTE,
  }),
  endpoint: 'votes',
  type: 'votes',
});

const attributes = {
  id: undefined,
  individual: true,
  option: '',
  voterId: undefined,
};

export default apiModelGenerator(attributes, apiDesc);

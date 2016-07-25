import { Map } from 'immutable';
import * as actions from '../constants/actionTypes';
import { APIDesc, apiModelGenerator } from './helpers/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_VOTES,
    resource: actions.GET_VOTE,
  }),
  endpoint: 'votes',
  type: 'vote',
});

const attributes = {
  id: null,
  individual: false,
  value: '',
};

export default apiModelGenerator(attributes, apiDesc);

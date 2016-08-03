import { Map } from 'immutable';
import * as actions from '../constants/actionTypes';
import { APIDesc, apiModelGenerator } from '../helpers/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_ARGUMENTS,
    resource: actions.GET_ARGUMENT,
  }),
  endpoint: 'arguments',
  type: 'arguments',
});

const attributes = {
  id: null,
  title: '',
  content: '',
  side: '',
  created_at: '',
  vote_count: null,
  creator: null,
};

export default apiModelGenerator(attributes, apiDesc);

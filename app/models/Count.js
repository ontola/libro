import { Map } from 'immutable';
import * as actions from '../constants/actionTypes';
import { APIDesc, apiModelGenerator } from './helpers/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_COUNTS,
    resource: actions.GET_COUNT,
  }),
  endpoint: 'counts',
  type: 'count',
});

const attributes = {
  id: null,
  name: '',
  option: '',
  value: null,
};

export default apiModelGenerator(attributes, apiDesc);

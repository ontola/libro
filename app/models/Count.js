import { Map } from 'immutable';

import * as actions from '../state/action-types';

import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_COUNTS,
    resource: actions.GET_COUNT,
  }),
  endpoint: 'counts',
  type: 'counts',
});

const attributes = {
  group: '',
  id: '',
  image: '',
  option: '',
  value: '',
};

export default apiModelGenerator(attributes, apiDesc);

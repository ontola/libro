import { Map } from 'immutable';

import * as actions from '../state/action-types';

import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_PERSONS,
    resource: actions.GET_PERSON,
  }),
  endpoint: 'persons',
  type: 'persons',
});

const attributes = {
  id: '',
  name: '',
  image: '',
  biography: '',
  group: '',
};

export default apiModelGenerator(attributes, apiDesc);

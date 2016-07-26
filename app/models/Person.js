import { Map } from 'immutable';
import * as actions from '../constants/actionTypes';
import { APIDesc, apiModelGenerator } from '../helpers/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_PERSONS,
    resource: actions.GET_PERSON,
  }),
  endpoint: 'persons',
  type: 'person',
});

const attributes = {
  id: null,
  name: '',
  image: '',
};

export default apiModelGenerator(attributes, apiDesc);

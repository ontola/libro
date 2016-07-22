import { Map } from 'immutable';
import * as actions from '../constants/actionTypes';
import { apiModelGenerator } from './helpers/apiModelGenerator';

const Person = apiModelGenerator({
  id: null,
  name: '',
  image: '',
}, {
  actions: new Map({
    collection: actions.GET_PERSONS,
    resource: actions.GET_PERSON,
  }),
  endpoint: 'persons',
  type: 'person',
});

export default Person;

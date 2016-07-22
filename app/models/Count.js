import { Map } from 'immutable';
import * as actions from '../constants/actionTypes';
import { apiModelGenerator } from './helpers/apiModelGenerator';

const Count = apiModelGenerator({
  id: null,
  name: '',
  option: '',
  value: null,
}, {
  actions: new Map({
    collection: actions.GET_COUNTS,
    resource: actions.GET_COUNT,
  }),
  endpoint: 'counts',
  type: 'count',
});

export default Count;

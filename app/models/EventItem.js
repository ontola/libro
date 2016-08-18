import { Map } from 'immutable';
import * as actions from '../state/action-types';
import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_EVENT_ITEMS,
    resource: actions.GET_EVENT_ITEM,
  }),
  endpoint: 'arguments',
  type: 'arguments',
});

const attributes = {
  id: null,
  title: '',
  content: '',
  index: '',
  created_at: '',
  creator: null,
};

export default apiModelGenerator(attributes, apiDesc);

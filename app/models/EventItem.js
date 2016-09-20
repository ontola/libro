import { Map } from 'immutable';
import * as actions from '../state/action-types';
import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_EVENT_ITEMS,
    resource: actions.GET_EVENT_ITEM,
  }),
  endpoint: 'eventItems',
  type: 'eventItems',
});

const attributes = {
  id: null,
  eventId: '',
  title: '',
  content: '',
  createdAt: null,
  creator: null,
};

export default apiModelGenerator(attributes, apiDesc);

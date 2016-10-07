import { Map } from 'immutable';
import * as actions from '../state/action-types';
import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_EVENT_ITEMS,
    resource: actions.GET_EVENT_ITEM,
  }),
  endpoint: 'event_items',
  type: 'event_items',
});

const attributes = {
  createdAt: null,
  creator: null,
  description: '',
  endDate: null,
  eventId: '',
  id: '',
  loading: false,
  name: '',
  startDate: null,
};

export default apiModelGenerator(attributes, apiDesc);

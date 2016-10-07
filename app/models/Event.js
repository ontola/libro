import { Map } from 'immutable';
import * as actions from '../state/action-types';
import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_EVENTS,
    resource: actions.GET_EVENT,
  }),
  endpoint: 'events',
  type: 'events',
});

const attributes = {
  attendees: [],
  classification: 'event',
  createdAt: null,
  creator: null,
  description: null,
  endDate: null,
  eventItems: [],
  id: '',
  identifiers: [],
  loading: false,
  location: null,
  name: '',
  startDate: null,
  status: null,
  speeches: [],
  text: '',
};

export default apiModelGenerator(attributes, apiDesc);

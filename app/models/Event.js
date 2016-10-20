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
  createdAt: new Date(),
  creator: '',
  description: '',
  endDate: new Date(),
  eventItems: [],
  id: '',
  identifiers: [],
  loading: false,
  location: '',
  name: '',
  startDate: new Date(),
  status: '',
  speeches: [],
  text: '',
};

export default apiModelGenerator(attributes, apiDesc);

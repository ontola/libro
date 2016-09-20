import { Map } from 'immutable';
import * as actions from '../state/action-types';
import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_EVENTS,
    resource: actions.GET_EVENT,
  }),
  endpoint: 'motions',
  type: 'motions',
});

const attributes = {
  classification: 'event',
  createdAt: null,
  creator: null,
  description: null,
  endDate: null,
  eventItems: [],
  id: null,
  identifiers: [],
  location: null,
  name: null,
  startDate: null,
  status: null,
  text: null,
};

export default apiModelGenerator(attributes, apiDesc);

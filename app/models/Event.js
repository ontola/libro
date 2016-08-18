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
  id: null,
  loading: false,
  title: '',
  text: '',
  createdAt: '',
  creator: null,
  classification: 'Event',
  eventItems: [],
};

export default apiModelGenerator(attributes, apiDesc);

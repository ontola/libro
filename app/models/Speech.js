import { Map } from 'immutable';

import * as actions from '../state/action-types';

import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_SPEECHES,
    resource: actions.GET_SPEECH,
  }),
  endpoint: 'speeches',
  type: 'speeches',
});

const attributes = {
  attributionText: '',
  endDate: new Date(),
  eventId: '',
  eventItemId: '',
  id: '',
  speakerId: '',
  startDate: new Date(),
  text: '',
  title: '',
  type: '',
};

export default apiModelGenerator(attributes, apiDesc);

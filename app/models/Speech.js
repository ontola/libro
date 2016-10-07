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
  id: undefined,
  attribution_text: '',
  start_date: '',
  event_item_id: '',
  event_id: '',
  end_date: '',
  speaker_id: '',
};

export default apiModelGenerator(attributes, apiDesc);

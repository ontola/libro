import { Map } from 'immutable';
import * as actions from '../constants/actionTypes';
import { APIDesc, apiModelGenerator } from './helpers/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_MOTIONS,
    resource: actions.GET_MOTION,
  }),
  endpoint: 'motions',
  type: 'motion',
});

const attributes = {
  id: null,
  title: '',
  text: '',
  created_at: '',
  creator: {},
  classification: 'Motie',
  arguments: [],
  vote_event: [],
};

export default apiModelGenerator(attributes, apiDesc);

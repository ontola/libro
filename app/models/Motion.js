import { Map } from 'immutable';
import * as actions from '../constants/actionTypes';
import { apiModelGenerator } from './helpers/apiModelGenerator';

const Motion = apiModelGenerator({
  id: null,
  title: '',
  text: '',
  created_at: '',
  creator: {},
  classification: 'Motie',
  arguments: [],
  vote_event: [],
}, {
  actions: new Map({
    collection: actions.GET_MOTIONS,
    resource: actions.GET_MOTION,
  }),
  endpoint: 'documents',
  type: 'motion',
});

export default Motion;

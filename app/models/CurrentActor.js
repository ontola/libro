import { Map } from 'immutable';

import { FRONTEND_URL } from '../config';
import * as actions from '../state/action-types';

import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_CURRENT_ACTOR,
    resource: actions.GET_CURRENT_ACTOR,
  }),
  arguModel: true,
  endpoint: `${FRONTEND_URL}/c_a`,
  type: 'currentActors',
});

const attributes = {
  actorType: 'Guest',
  displayName: '',
  finishedIntro: true,
  id: null,
  loading: false,
  shortname: '',
};

export default apiModelGenerator(attributes, apiDesc);

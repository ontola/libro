import { Map } from 'immutable';

import { FRONTEND_URL } from '../config';
import * as actions from '../state/action-types';
import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_CURRENT_ACTOR,
    resource: actions.GET_CURRENT_ACTOR,
  }),
  endpoint: `${FRONTEND_URL}/c_a`,
  type: 'currentActors',
  arguModel: true,
});

const attributes = {
  actorType: 'Guest',
  displayName: '',
  shortname: '',
  finishedIntro: true,
  id: null,
  loading: false,
};

export default apiModelGenerator(attributes, apiDesc);

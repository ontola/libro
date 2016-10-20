import { Map } from 'immutable';
import * as actions from '../state/action-types';
import { APIDesc, apiModelGenerator } from './utils/apiModelGenerator';

const apiDesc = new APIDesc({
  actions: new Map({
    collection: actions.GET_GROUPS,
    resource: actions.GET_GROUP,
  }),
  endpoint: 'groups',
  type: 'groups',
});

const attributes = {
  id: '',
  organizationId: '',
  type: '',
};

export default apiModelGenerator(attributes, apiDesc);

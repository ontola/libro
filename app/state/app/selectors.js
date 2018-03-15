import { SET_ORGANIZATION } from '../action-types';

export const getOrganization = state =>
  state.getIn(['app', SET_ORGANIZATION]);

export default getOrganization;

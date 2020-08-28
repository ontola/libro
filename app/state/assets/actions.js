import { createAction } from 'redux-actions';

import * as actions from '../action-types';

export const requestAsset = createAction(
  actions.AFE_API_GET_ASSET,
  (file) => ({
    file,
  })
);
export const storeAsset = createAction(
  actions.AFE_API_STORE_ASSET,
  (file, json) => ({
    file,
    json,
  })
);

import DataStore from './utils/DataStore';

import {
  handleError,
  handleRecord,
  handleRequest,
} from './utils/apiActionCreators';

import {
  callApi,
  parseResult,
  yieldEntities,
} from './utils/apiHelpers';

const JsonApiMiddleware = ({
  models,
  apiBaseUrl,
}) => () => next => (action) => {
  if (!action.payload || !action.payload.apiAction) {
    return next(action);
  }

  const dataStore = new DataStore(models);

  next(handleRequest(action));

  return callApi(apiBaseUrl, action)
    .then(data => next(parseResult(dataStore, yieldEntities(data), handleRecord)))
    .catch(error => next(handleError(action, error)));
};

export default JsonApiMiddleware;

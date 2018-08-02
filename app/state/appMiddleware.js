import LogRocket from 'logrocket';

import * as actions from './action-types';

const appMiddleware = () => next => (action) => {
  switch (action.type) {
    case actions.SET_CURRENT_USER: {
      const id = action.payload.get('anonymousID');
      if (id) {
        LogRocket.identify(id);
      }
      break;
    }
    default:
  }
  next(action);
};

export default appMiddleware;

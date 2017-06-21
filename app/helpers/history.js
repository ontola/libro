import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

const createSelectLocationState = () => {
  let prevRoutingState, prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('router');

    if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export const history = browserHistory;

const immutableHistory = store => syncHistoryWithStore(browserHistory, store, {
  selectLocationState: createSelectLocationState(),
});

export default immutableHistory;

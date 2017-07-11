import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { createMemoryHistory } from 'history';

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


const history = __CLIENT__ ? browserHistory : createMemoryHistory();
const immutableHistory = store => syncHistoryWithStore(history, store, {
  selectLocationState: createSelectLocationState(),
});

export { history };

export default immutableHistory;

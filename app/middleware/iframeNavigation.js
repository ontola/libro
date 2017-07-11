import { push } from 'react-router-redux';

import { setMetadata } from '../state/iframe/actions';

function onlyArgu(f) {
  return (e) => {
    if (e.origin !== __ORIGIN__) {
      return;
    }
    f(e);
  };
}

export default (store) => {
  function receiveMessage(rootEvent) {
    if (rootEvent.data === 'hello') {
      const navigation = (e) => {
        if (typeof e.data.navigation !== 'undefined') {
          const url = e.data.navigation && new URL(e.data.navigation);
          const href = url && url.pathname + url.search;
          const event = push(href);
          store.dispatch(event);
        }
        if (typeof e.data.meta !== 'undefined') {
          store.dispatch(setMetadata({
            title: e.data.meta.title,
          }));
        }
      };
      rootEvent.source.addEventListener('message', onlyArgu(navigation));
      rootEvent.source.postMessage('hi', __ORIGIN__);
    }
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('message', onlyArgu(receiveMessage), false);
  }

  return next => action => next(action);
};

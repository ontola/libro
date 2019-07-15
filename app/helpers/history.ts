import { createBrowserHistory, createMemoryHistory } from 'history';

const history = __CLIENT__ ? createBrowserHistory() : createMemoryHistory();

export const History = history.constructor;

export default history;

import { createBrowserHistory, createMemoryHistory } from 'history';

const history = __CLIENT__ ? createBrowserHistory() : createMemoryHistory();

export default history;

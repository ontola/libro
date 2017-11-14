import { createMemoryHistory } from 'history';
import createHistory from 'history/createBrowserHistory';

const history = __CLIENT__ ? createHistory() : createMemoryHistory();

export default history;

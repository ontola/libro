export const EXEC_HEADER_NAME = 'Exec-Action';
export const EXEC_HEADER_READ_NAME = 'exec-action';
export const EXPIRE_SESSION_ACTION = 'https://ns.ontola.io/actions/expireSession';
const SPLIT_MARKER = ', ';

export function getActions(req) {
  return (req.headers[EXEC_HEADER_READ_NAME]
    && req.headers[EXEC_HEADER_READ_NAME].split(SPLIT_MARKER)) || [];
}

export function getAction(req, wanted) {
  return getActions(req).find(action => action.startsWith(wanted));
}

export function hasAction(req, wanted) {
  return typeof getAction(req, wanted) !== 'undefined';
}

export function setActionParam(req, action, param, value) {
  const actions = getActions(req);
  const toUpdate = actions.findIndex(a => a.startsWith(action));
  if (toUpdate >= 0) {
    const url = new URL(actions[toUpdate]);
    url.searchParams.set(param, value.trim().replace(/ /g, '+'));
    actions[toUpdate] = url.toString();
  }

  return actions.join(SPLIT_MARKER);
}

const HEADER_NAME = 'exec-action';
const SPLIT_MARKER = ', ';

export function getActions(req) {
  return (req.headers[HEADER_NAME] && req.headers[HEADER_NAME].split(SPLIT_MARKER)) || [];
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

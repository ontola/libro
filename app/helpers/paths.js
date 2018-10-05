import { NS } from './LinkedRenderStore';

export function currentLocation(location) {
  return NS.app(`${location.pathname.substr(1)}${location.search}${location.hash}`);
}

export function absoluteRouterLocation(state) {
  const location = state.getIn(['router', 'location']);

  return location && location.get('pathname') + location.get('search') + location.get('hash');
}

const path = {
  confirmation() {
    return '/users/confirmation/new';
  },

  index() {
    return '/';
  },

  newPassword() {
    return '/users/password/new';
  },

  /**
   * Sign-in / registration entrance route
   * @param {string} r The URL to return to after signing in/up
   * @returns {string} The URL.
   */
  signIn(r) {
    const url = '/u/sign_in';
    return r ? `${url}?r=${encodeURIComponent(r)}` : url;
  },
};

export default path;

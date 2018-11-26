import { Map } from 'immutable';
import { NamedNode } from 'rdflib';

import { NS } from './LinkedRenderStore';

export function currentLocation(location: Location): NamedNode {
  const path = location.pathname;
  const normalizedPath = path.slice(1, path.length - (path.endsWith('/') ? 1 : 0));

  return NS.app(`${normalizedPath}${location.search}${location.hash}`);
}

export function absoluteRouterLocation(state: Map<string, Map<string, any>>): string {
  const location: Map<string, any> = state.getIn(['router', 'location']);

  return location && location.get('pathname') + location.get('search') + location.get('hash');
}

const paths = {
  confirmation(): string {
    return '/users/confirmation/new';
  },

  index(): string {
    return '/';
  },

  newPassword(): string {
    return '/users/password/new';
  },

  /**
   * Sign-in / registration entrance route
   * @param {string} r The URL to return to after signing in/up
   * @returns {string} The URL.
   */
  signIn(r: string): string {
    const url = '/u/sign_in';
    return r ? `${url}?r=${encodeURIComponent(r)}` : url;
  },
};

export default paths;

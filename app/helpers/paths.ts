import { Map } from 'immutable';
import { NamedNode } from 'rdflib';
import { frontendPathname } from '../middleware/app';

import { NS } from './LinkedRenderStore';

export function currentLocation(location: Location, fragment = true, basePath = frontendPathname, ns = NS): NamedNode {
  const path = (basePath !== '/' && location.pathname.startsWith(basePath))
      ? location.pathname.slice(basePath.length)
      : location.pathname;
  const normalizedPath = path.slice(0, (path.endsWith('/') ? -1 : undefined));

  return ns.appSlashless(`${normalizedPath}${location.search}${fragment ? location.hash : ''}`);
}

export function absoluteRouterLocation(state: Map<string, Map<string, any>>): string {
  const location: Map<string, any> = state.getIn(['router', 'location']);

  return location && location.get('pathname') + location.get('search') + location.get('hash');
}

const paths = {
  confirmation(): string {
    return new URL(NS.app('/users/confirmation/new').value).pathname;
  },

  index(): string {
    return '/';
  },

  newPassword(): string {
    return new URL(NS.app('users/password/new').value).pathname;
  },

  /**
   * Sign-in / registration entrance route
   * @param {string} r The URL to return to after signing in/up
   * @returns {string} The URL.
   */
  signIn(r?: string): string {
    const url = new URL(NS.app('u/sign_in').value).pathname;
    return r ? `${url}?r=${encodeURIComponent(r)}` : url;
  },
};

export default paths;

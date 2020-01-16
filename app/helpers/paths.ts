import { NamedNode } from '@ontologies/core';
import { Map } from 'immutable';
import { NamespaceMap } from 'link-lib';

import { frontendPathname } from '../middleware/app';
import app from '../ontology/app';

import { NS } from './LinkedRenderStore';

export function currentLocation(location: Location,
                                fragment = true,
                                basePath = frontendPathname,
                                ns: NamespaceMap = NS): NamedNode {
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
    return app.ns('users/confirmation/new').value;
  },

  index(): string {
    return '/';
  },

  newPassword(): string {
    return app.ns('users/password/new').value;
  },

  newUnlock(): string {
    return app.ns('users/unlock/new').value;
  },

  /**
   * Sign-in / registration entrance route
   * @param {string} r The URL to return to after signing in/up
   * @returns {string} The URL.
   */
  signIn(r?: string): string {
    const url = app.ns('u/sign_in').value;
    return r ? `${url}?r=${encodeURIComponent(r)}` : url;
  },
};

export default paths;

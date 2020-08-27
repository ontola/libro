import { NamedNode } from '@ontologies/core';
import { Location } from 'history';
import { Map } from 'immutable';
import { NamespaceMap } from 'link-lib';

import app, { frontendPathname } from '../ontology/app';
import appSlashless from '../ontology/appSlashless';

export function currentLocation(location: Location<any>,
                                fragment = true,
                                basePath = frontendPathname,
                                ns: NamespaceMap = { appSlashless }): NamedNode {
  const path = (basePath !== '/' && location.pathname.startsWith(basePath))
      ? location.pathname.slice(basePath.length)
      : location.pathname;
  const normalizedPath = path.slice(0, (path.endsWith('/') ? -1 : undefined));

  return ns.appSlashless.ns(`${normalizedPath}${location.search}${fragment ? location.hash : ''}`);
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
   * @param {string} redirect_url The URL to return to after signing in/up
   * @returns {string} The URL.
   */
  signIn(redirectUrl?: string): string {
    const url = app.ns('u/sign_in').value;
    return redirectUrl ? `${url}?redirect_url=${encodeURIComponent(redirectUrl)}` : url;
  },
};

export default paths;

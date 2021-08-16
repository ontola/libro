import { NamedNode } from '@ontologies/core';
import { Location } from 'history';
import { NamespaceMap } from 'link-lib';

import app, { frontendPathname } from '../ontology/app';
import appSlashless from '../ontology/appSlashless';

import { WebsiteCtx } from './app';

export function CurrentLocationControl(
  location: Location<any>,
  fragment = true,
  basePath = frontendPathname,
  ns: NamespaceMap | WebsiteCtx = { appSlashless },
): NamedNode {
  const path = (basePath !== '/' && location.pathname.startsWith(basePath))
    ? location.pathname.slice(basePath.length)
    : location.pathname;
  const normalizedPath = path.slice(0, (path.endsWith('/') ? -1 : undefined));

  return ns.appSlashless.ns(`${normalizedPath}${location.search}${fragment ? location.hash : ''}`);
}

export function absoluteRouterLocation(state: Record<string, Record<string, any>>): string {
  const location: Record<string, any> = state.router.location;

  return location && location.get('pathname') + location.get('search') + location.get('hash');
}

const paths = {
  confirmation(): string {
    return app.ns('u/confirmation/new').value;
  },

  index(): string {
    return '/';
  },

  newPassword(): string {
    return app.ns('u/password/new').value;
  },

  newUnlock(): string {
    return app.ns('u/unlock/new').value;
  },

  /**
   * Sign-in / registration entrance route
   * @param {string} redirect_url The URL to return to after signing in/up
   * @returns {string} The URL.
   */
  signIn(redirectUrl?: string): string {
    const url = app.ns('u/session/new').value;

    return redirectUrl ? `${url}?redirect_url=${encodeURIComponent(redirectUrl)}` : url;
  },
};

export default paths;

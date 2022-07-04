import { NamedNode } from '@ontologies/core';
import type { Location } from 'history';
import { NamespaceMap } from 'link-lib';

import appSlashless from '../../../ontology/appSlashless';
import { WebsiteCtx } from '../../Kernel/components/WebsiteContext/websiteContext';
import { frontendPathname } from '../../Kernel/lib/frontendIRIComponents';
import app from '../ontology/app';

export function currentLocationControl(
  location: Location,
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

export const absoluteRouterLocation = (location: Location, origin: string): string =>
  origin + location.pathname + location.search + location.hash;

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

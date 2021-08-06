import { NamedNode } from '@ontologies/core';
import React from 'react';

import { WebsiteCtx } from './helpers/app';

export const WebsiteContext = React.createContext<WebsiteCtx | undefined>(undefined);

export interface WithWebsiteIRI {
  websiteIRI?: NamedNode;
}

export function withWebsiteIRI(Component: React.ComponentType<WithWebsiteIRI>) {
  return (props: unknown): JSX.Element => {
    const location = React.useContext(WebsiteContext);

    return (
      <Component
        {...props}
        websiteIRI={location?.websiteIRI}
      />
    );
  };
}

export interface WithWebsitePathname {
  websitePathname?: string;
}

export function withWebsitePathname(Component: React.ComponentType<WithWebsitePathname>) {
  return (props: unknown): JSX.Element => {
    const location = React.useContext(WebsiteContext);

    return (
      <Component
        {...props}
        websitePathname={location?.websitePathname}
      />
    );
  };
}

export interface WithWebsiteCtx {
  websiteCtx?: WebsiteCtx;
}

export function withWebsiteCtx<P>(Component: React.ComponentType<WithWebsiteCtx & P>) {
  return (props: P): JSX.Element => {
    const location = React.useContext(WebsiteContext);

    return (
      <Component
        {...props}
        websiteCtx={location}
      />
    );
  };
}

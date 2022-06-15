import { CustomPredicateCreator, NamedNode } from '@ontologies/core';
import React from 'react';

export interface WebsiteCtx {
  app: CustomPredicateCreator;
  appSlashless: CustomPredicateCreator;

  websiteIRI: NamedNode;
  websiteIRIStr: string;
  websiteOrigin: string;
  websitePathname: string;
}

export const WebsiteContext = React.createContext<WebsiteCtx | undefined>(undefined);

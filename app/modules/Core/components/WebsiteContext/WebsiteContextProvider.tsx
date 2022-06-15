import rdf, { createNS } from '@ontologies/core';
import React, { ReactNode } from 'react';

import { appContext } from '../AppContext/appContext';

import { WebsiteContext, WebsiteCtx } from './websiteContext';

export const getWebsiteContextFromWebsite = (website?: string): WebsiteCtx => {
  const websiteIRI = rdf.namedNode(website);
  const websiteIRIStr = websiteIRI.value;
  const websiteOrigin = new URL(websiteIRIStr).origin;

  return {
    app: { ns: createNS(websiteIRIStr.endsWith('/') ? websiteIRIStr : `${websiteIRIStr}/`) },
    appSlashless: { ns: createNS(websiteIRIStr.slice(0, websiteIRIStr.endsWith('/') ? -1 : undefined)) },

    websiteIRI,
    websiteIRIStr: websiteIRI.value,
    websiteOrigin,
    websitePathname: new URL(websiteIRIStr).pathname,
  };
};

interface WebsiteContextProvider {
  children: ReactNode
  websiteCtxOverride?: WebsiteCtx
}

const WebsiteContextProvider = ({
  children,
  websiteCtxOverride,
}: WebsiteContextProvider): JSX.Element => {
  const { website } = React.useContext(appContext);
  const websiteCtxValue = websiteCtxOverride ?? getWebsiteContextFromWebsite(website);

  return (
    <WebsiteContext.Provider value={websiteCtxValue}>
      {children}
    </WebsiteContext.Provider>
  );
};

export default WebsiteContextProvider;

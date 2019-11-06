import rdf, { createNS } from '@ontologies/core';

export const getWebsiteContextFromWebsite = (website) => {
  const websiteIRI = rdf.namedNode(website);
  const websiteIRIStr = websiteIRI.value;
  const websiteOrigin = new URL(websiteIRIStr).origin;

  return {
    app: createNS(websiteIRIStr.endsWith('/') ? websiteIRIStr : `${websiteIRIStr}/`),
    appSlashless: createNS(websiteIRIStr.slice(0, websiteIRIStr.endsWith('/') ? -1 : undefined)),

    websiteIRI,
    websiteIRIStr: websiteIRI.value,
    websiteOrigin,
    websitePathname: new URL(websiteIRIStr).pathname,
  };
};

export default getWebsiteContextFromWebsite;

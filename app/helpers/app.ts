import rdf, {
  CustomPredicateCreator,
  NamedNode,
  createNS,
} from '@ontologies/core';

export interface WebsiteCtx {
  app: CustomPredicateCreator;
  appSlashless: CustomPredicateCreator;

  websiteIRI: NamedNode;
  websiteIRIStr: string;
  websiteOrigin: string;
  websitePathname: string;
}

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

export default getWebsiteContextFromWebsite;

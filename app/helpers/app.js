import { NamedNode, Namespace } from 'rdflib';

export const getWebsiteContextFromWebsite = (website) => {
  const websiteIRI = NamedNode.find(website);
  const websiteIRIStr = websiteIRI.value;
  const websiteOrigin = new URL(websiteIRIStr).origin;

  return {
    app: Namespace(websiteIRIStr.endsWith('/') ? websiteIRIStr : `${websiteIRIStr}/`),
    appSlashless: Namespace(websiteIRIStr.slice(0, websiteIRIStr.endsWith('/') ? -1 : undefined)),

    websiteIRI,
    websiteIRIStr: websiteIRI.value,
    websiteOrigin,
    websitePathname: new URL(websiteIRIStr).pathname,
  };
};

export default getWebsiteContextFromWebsite;

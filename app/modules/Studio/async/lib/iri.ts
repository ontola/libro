import { sliceIRI } from '../../../../ontology/appSlashless';

export const websiteRelativePath = (iri: string, websiteIRI: string): string => {
  const slashless = sliceIRI(websiteIRI);

  return iri.replace(new RegExp(`^${slashless}`), '') || '/';
};

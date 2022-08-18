import { removeTrailingSlash } from '../../../Kernel/lib/id';

export const websiteRelativePath = (iri: string, websiteIRI: string): string => {
  const slashless = removeTrailingSlash(websiteIRI);

  return iri.replace(new RegExp(`^${slashless}`), '') || '/';
};

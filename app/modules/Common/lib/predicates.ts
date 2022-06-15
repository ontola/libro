import * as as from '@ontologies/as';
import * as dcterms from '@ontologies/dcterms';
import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';

export const namePredicates = [
  schema.name,
  as.name,
  rdfs.label,
  foaf.name,
  sh.name,
  dcterms.title,
];


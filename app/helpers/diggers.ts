/**
 * Contains common property paths for use with LinkedRenderStore#dig
 */

import as from '@ontologies/as';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';

import ontola from '../ontology/ontola';

export const collectionMembers = [ontola.pages, as.items, rdfs.member];
export const actionType = [schema.potentialAction, rdfx.type];

export default collectionMembers;

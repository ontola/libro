/**
 * Contains common property paths for use with LinkedRenderStore#dig
 */

import as from '@ontologies/as';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';

import { NS } from './LinkedRenderStore';

export const collectionMembers = [NS.ontola('pages'), as.items, rdfs.member];
export const actionType = [schema.potentialAction, rdfx.type];

export default collectionMembers;

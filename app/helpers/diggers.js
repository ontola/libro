/**
 * Contains common property paths for use with LinkedRenderStore#dig
 */

import { NS } from './LinkedRenderStore';

export const collectionMembers = [NS.as('pages'), NS.as('items'), NS.rdfs('member')];
export const actionType = [NS.schema('potentialAction'), NS.rdf('type')];

export default collectionMembers;

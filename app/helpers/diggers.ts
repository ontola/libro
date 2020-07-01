/**
 * Contains common property paths for use with LinkedRenderStore#dig
 */

import as from '@ontologies/as';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';

import form from '../ontology/form';
import ontola from '../ontology/ontola';

export const collectionMembers = [ontola.pages, as.items, rdfs.member];
export const actionType = [schema.potentialAction, rdfx.type];
export const formFieldsPath = [
    form.pages,
    rdfs.member,
    form.groups,
    rdfs.member,
    form.fields,
    rdfs.member,
];
export const nestedFormsPath = [...formFieldsPath, form.form];

export default collectionMembers;

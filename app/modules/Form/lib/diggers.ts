/**
 * Contains common property paths for use with LinkedRenderStore#dig
 */

import * as rdfs from '@ontologies/rdfs';
import * as sh from '@ontologies/shacl';

import form from '../ontology/form';
import ontola from '../../../ontology/ontola';

export const formGroupsPath = [
  form.pages,
  rdfs.member,
  form.groups,
];
export const formFieldSeqPath = [
  ...formGroupsPath,
  rdfs.member,
  form.fields,
];
export const formFieldsPath = [
  ...formFieldSeqPath,
  rdfs.member,
];
export const conditionalFormFieldsPath = [...formFieldsPath, ontola.pass];
export const nestedFormsPath = [...formFieldsPath, form.form];
export const nestedConditionalFormsPath = [...conditionalFormFieldsPath, form.form];
export const nestedConditionalIfInPath = [...formFieldsPath, sh.node, sh.property, sh.shaclin];
export const nestedConditionalUnlessInPath = [...formFieldsPath, sh.node, sh.not, sh.shaclin];

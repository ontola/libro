import {
  NamedNode,
  isNamedNode,
  isNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { isResource } from '../../../Kernel/lib/typeCheckers';
import ontola from '../../../Kernel/ontology/ontola';
import {
  formFieldSeqPath,
  formFieldsPath,
  formGroupsPath,
  nestedConditionalFormsPath,
  nestedConditionalIfInPath,
  nestedConditionalUnlessInPath,
  nestedFormsPath,
} from '../../lib/diggers';
import form from '../../ontology/form';

import { getNestedObjects } from './getNestedObjects';
import { getFormFields, rawFormObjectValue } from './helpers';

const formDependencies = (lrs: LinkReduxLRSType, parentForm: SomeNode): SomeNode[] => [
  parentForm,
  ...lrs.dig(parentForm, [form.pages]),
  ...lrs.dig(parentForm, formGroupsPath),
  ...lrs.dig(parentForm, formFieldSeqPath),
  ...lrs.dig(parentForm, formFieldsPath),
  ...lrs.dig(parentForm, nestedFormsPath),
  ...lrs.dig(parentForm, nestedConditionalFormsPath),
  ...lrs.dig(parentForm, nestedConditionalIfInPath),
  ...lrs.dig(parentForm, nestedConditionalUnlessInPath),
].filter(isNode);

const renderedFieldValue = (lrs: LinkReduxLRSType, field?: SomeNode) => {
  const fieldType = lrs.getResourceProperty<NamedNode>(field, rdfx.type);

  return (
    fieldType && [
      form.CheckboxGroup,
      form.CheckboxInput,
      form.LocationInput,
      form.RadioGroup,
      form.SelectInput,
      form.ToggleButtonGroup,
      form.ResourceField,
    ].includes(fieldType)
  );
};

export const getDependencies = (
  lrs: LinkReduxLRSType,
  sessionStore: Storage | undefined,
  parentForm: SomeNode,
  object: SomeNode,
  formID: string,
  nested: boolean,
): SomeNode[] => {
  const dependentResources = new Set<SomeNode>();
  dependentResources.add(object);
  formDependencies(lrs, parentForm).forEach(dependentResources.add, dependentResources);

  getFormFields(lrs, parentForm).forEach((field) => {
    const shInProp = lrs.getResourceProperty(field, ontola.shIn);
    const shIn = isNamedNode(shInProp)
      ? lrs.getResourceProperties(object, shInProp)
      : lrs.getResourceProperties(field, sh.shaclin);
    shIn.filter(isNode).forEach(dependentResources.add, dependentResources);
    const path = lrs.getResourceProperty<NamedNode>(field, sh.path);

    if (path) {
      const value = rawFormObjectValue(lrs, field, object, sessionStore, formID, nested);
      const nestedForm = lrs.getResourceProperty(field, form.form) as SomeNode;

      if (nestedForm) {
        getNestedObjects(lrs, value.filter(isNode)).forEach((nestedObject) => {
          getDependencies(
            lrs,
            sessionStore,
            nestedForm,
            nestedObject,
            formID,
            true,
          ).forEach(dependentResources.add, dependentResources);
        });
      } else if (renderedFieldValue(lrs, field)) {
        value.filter(isResource).forEach(dependentResources.add, dependentResources);
      }
    } else {
      const urls = lrs.getResourceProperties(field, schema.url).filter(isNode);

      urls.forEach(dependentResources.add, dependentResources);
    }
  });

  return [...dependentResources];
};


import {
  NamedNode,
  QuadPosition,
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

import { getFormFields, rawFormObjectValue } from './helpers';
import { getNestedDependencies } from './getNestedDependencies';

const paths = [
  [form.pages],
  formGroupsPath,
  formFieldSeqPath,
  formFieldsPath,
  nestedFormsPath,
  nestedConditionalFormsPath,
  nestedConditionalIfInPath,
  nestedConditionalUnlessInPath,
];

const getFormDependencies = (lrs: LinkReduxLRSType, parentForm: SomeNode): SomeNode[] => {
  const deps = [
    parentForm,
  ];

  for (const path of paths) {
    const [quadruples, intermediates] = lrs.digDeeper(parentForm, path);
    deps.push(...intermediates);
    deps.push(...quadruples.map((q) => q[QuadPosition.object]).filter(isNode));
  }

  return deps;
};

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

const addFormDependencies = (
  formDependencies: Set<SomeNode>,
  lrs: LinkReduxLRSType,
  parentForm: SomeNode,
): void => {
  getFormDependencies(lrs, parentForm).forEach(formDependencies.add, formDependencies);

  getFormFields(lrs, parentForm).forEach((field) => {
    lrs.getResourceProperties(field, sh.shaclin).filter(isNode).forEach(formDependencies.add, formDependencies);
    lrs.getResourceProperties(field, schema.url).filter(isNode).forEach(formDependencies.add, formDependencies);
  });
};

const addObjectDependencies = (
  objectDependencies: Set<SomeNode>,
  formDependencies: Set<SomeNode>,
  lrs: LinkReduxLRSType,
  sessionStore: Storage | undefined,
  parentForm: SomeNode,
  objects: SomeNode[],
  formID: string,
  nested: boolean,
): void => {
  objects.forEach(objectDependencies.add, objectDependencies);
  getFormFields(lrs, parentForm).forEach((field) => {
    const shInProp = lrs.getResourceProperty<NamedNode>(field, ontola.shIn);
    const path = lrs.getResourceProperty<NamedNode>(field, sh.path);

    objects.forEach((object) => {
      if (path) {
        if (shInProp) {
          lrs.getResourceProperties(object, shInProp).filter(isNode).forEach(formDependencies.add, formDependencies);
        }

        const value = rawFormObjectValue(lrs, field, object, sessionStore, formID, nested);
        const nestedForm = lrs.getResourceProperty<SomeNode>(field, form.form);

        if (nestedForm) {
          const nestedDependencies = getNestedDependencies(lrs, value.filter(isNode), true);

          addDependencies(
            objectDependencies,
            formDependencies,
            lrs,
            sessionStore,
            nestedForm,
            nestedDependencies,
            formID,
            true,
          );
        } else if (renderedFieldValue(lrs, field)) {
          value.filter(isResource).forEach(formDependencies.add, formDependencies);
        }
      }
    });
  });
};

/**
 * Recursively calculates the set of records used by a form (including the form itself) from an {object}.
 *
 * Practically descending all (nested) fields taking note of `object[path]` values and intermediate
 * records like collection records.
 */
export const addDependencies = (
  objectDependencies: Set<SomeNode>,
  formDependencies: Set<SomeNode>,
  lrs: LinkReduxLRSType,
  sessionStore: Storage | undefined,
  parentForm: SomeNode,
  objects: SomeNode[],
  formID: string,
  nested: boolean,
): void => {
  addObjectDependencies(
    objectDependencies,
    formDependencies,
    lrs,
    sessionStore,
    parentForm,
    objects,
    formID,
    nested,
  );
  addFormDependencies(formDependencies, lrs, parentForm);
};


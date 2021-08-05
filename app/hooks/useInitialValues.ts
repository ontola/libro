import * as as from '@ontologies/as';
import {
  BlankNode,
  NamedNode,
  SomeTerm,
  Term,
  isNamedNode,
  isNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import {
  LaxNode,
  LinkReduxLRSType,
  useDataFetching,
  useLRS,
} from 'link-redux';
import React from 'react';

import { entityIsLoaded, resourceHasType } from '../helpers/data';
import {
  collectionMembers,
  conditionalFormFieldsPath,
  formFieldsPath,
  nestedConditionalFormsPath,
  nestedConditionalIfInPath,
  nestedConditionalUnlessInPath,
  nestedFormsPath,
} from '../helpers/diggers';
import { JSONLDObject, calculateFormFieldName } from '../helpers/forms';
import { getStorageKey, storageGet } from '../helpers/persistence';
import { isResource } from '../helpers/types';
import form from '../ontology/form';
import ontola from '../ontology/ontola';

import { InputValue } from './useFormField';

const isCollection = (lrs: LinkReduxLRSType, value: Term[]) => {
  const firstValue = value[0];

  return value?.length === 1 && isNode(firstValue) && resourceHasType(lrs, firstValue, as.Collection);
};

const renderedFieldValue = (fieldType?: NamedNode) => (
  fieldType && [
    form.AssociationInput,
    form.CheckboxGroup,
    form.CheckboxInput,
    form.LocationInput,
    form.RadioGroup,
    form.SelectInput,
    form.ToggleButtonGroup,
  ].includes(fieldType)
);

export const inputValueFromStorage = (
  sessionStore: Storage | undefined,
  path: NamedNode,
  object: SomeNode | undefined,
  formID: string,
  nested: boolean,
): SomeTerm[] | undefined => {
  const storageKey = getStorageKey(formID, nested ? object : undefined, path);

  return storageGet(sessionStore, storageKey);
};

const getInitialValues = (
  lrs: LinkReduxLRSType,
  sessionStore: Storage | undefined,
  addValue: (key: string, value: InputValue[]) => void,
  parentForm: SomeNode,
  object: SomeNode | undefined,
  formContext: string,
  nested: boolean,
) => {
  const fields = lrs.dig(parentForm, formFieldsPath);
  const conditionalFields = lrs.dig(parentForm, conditionalFormFieldsPath);
  const dependentResources = [
    object,
    parentForm,
    ...lrs.dig(parentForm, nestedFormsPath),
    ...lrs.dig(parentForm, nestedConditionalFormsPath),
    ...lrs.dig(parentForm, nestedConditionalIfInPath),
    ...lrs.dig(parentForm, nestedConditionalUnlessInPath),
  ];

  (fields.concat(conditionalFields)).filter(isNode).forEach((field) => {
    const defaultValue = lrs.getResourceProperties(field, form.defaultValue);
    const shInProp = lrs.getResourceProperty(field, ontola.shIn);
    const shIn = isNamedNode(shInProp)
      ? lrs.getResourceProperties(object, shInProp)
      : lrs.getResourceProperties(field, sh.shaclin);
    dependentResources.push(...shIn);

    const path = lrs.getResourceProperty<NamedNode>(field, sh.path);
    const fieldType = lrs.getResourceProperty<NamedNode>(field, rdfx.type);

    if (path && object) {
      const fieldName = calculateFormFieldName(path);
      const valueFromStorage = inputValueFromStorage(sessionStore, path, object, formContext, nested);
      const nestedForm = lrs.getResourceProperty(field, form.form) as SomeNode;

      const initialValue = defaultValue.length > 0 ? defaultValue : lrs.getResourceProperties(object, path);
      let value = valueFromStorage || initialValue;

      if (renderedFieldValue(fieldType)) {
        dependentResources.push(...value.filter(isResource));

        if (isCollection(lrs, value)) {
          const members = lrs.dig(value[0] as SomeNode, collectionMembers);
          dependentResources.push(...members.filter(isResource));
          value = members;
        }
      }

      if (nestedForm) {
        addValue(fieldName, value.filter(isNode).map((nestedValue) => {
          const nestedObject = {
            '@id': nestedValue,
          } as JSONLDObject;

          const nestedDependentResources = getInitialValues(
            lrs,
            sessionStore,
            (key, val) => {
              nestedObject[key] = val;
            },
            nestedForm,
            nestedValue,
            formContext,
            true,
          );

          dependentResources.push(...nestedDependentResources);

          return nestedObject;
        }));
      } else {
        addValue(fieldName, value);
      }
    } else {
      const url = lrs.getResourceProperty(field, schema.url);

      if (url) {
        dependentResources.push(url);
      }
    }
  });

  return dependentResources;
};

const useInitialValues = (
  sessionStore: Storage | undefined,
  actionBody: LaxNode,
  object: SomeNode | undefined,
  formID: string,
): [boolean | NamedNode | BlankNode | undefined,  Record<string, unknown> | undefined] => {
  const lrs = useLRS();
  const [timestamp, setTimestamp] = React.useState<null | number>(null);
  const [loading, setLoading] = React.useState<boolean | SomeNode | undefined>(true);
  const [initialValues, setInitialValues] = React.useState({});

  const dependentResources = React.useMemo(() => {
    if (!actionBody) {
      setLoading(false);

      return [];
    }

    const currentValues = {} as { [index: string]: InputValue[]; };

    const addValue = (key: string, value: InputValue[]) => {
      if (!Object.keys(currentValues).includes(key)) {
        currentValues[key] = value;
      }
    };

    const dependencies = getInitialValues(lrs, sessionStore, addValue, actionBody, object, formID, false);

    const currentLoading = dependencies.filter(isNamedNode).find((resource) => (
      !entityIsLoaded(lrs, resource)
    ));

    if (loading !== currentLoading) {
      setInitialValues(currentValues);
      setLoading(currentLoading);
    }

    return dependencies;
  }, [actionBody, object, formID, timestamp]);
  const currentTimestamp = useDataFetching(dependentResources.filter(isNamedNode));

  if (currentTimestamp !== timestamp) {
    setTimestamp(currentTimestamp);
  }

  return [loading, initialValues as Record<string, unknown>];
};

export default useInitialValues;

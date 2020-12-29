import as from '@ontologies/as';
import { isNamedNode, isNode, NamedNode, SomeTerm, Term } from '@ontologies/core';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import {
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
  nestedFormsPath,
} from '../helpers/diggers';
import { calculateFormFieldName, JSONLDObject } from '../helpers/forms';
import { getStorageKey, storageGet } from '../helpers/persistence';
import { isResource } from '../helpers/types';
import form from '../ontology/form';
import { InputValue } from './useFormField';

const isCollection = (lrs: LinkReduxLRSType, value: Term[]) => {
  const firstValue = value[0];
  return value?.length === 1 && isNode(firstValue) && resourceHasType(lrs, firstValue, as.Collection);
};

const getInitialValues = (
  lrs: LinkReduxLRSType,
  sessionStore: Storage,
  addValue: (key: string, value: InputValue[]) => void,
  parentForm: SomeNode,
  object: SomeNode,
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
  ];

  (fields.concat(conditionalFields)).filter(isNode).forEach((field) => {
    const shIn = lrs.getResourceProperties(field, sh.in);
    dependentResources.push(...shIn);

    const path = lrs.getResourceProperty(field, sh.path) as NamedNode;
    if (path) {
      const fieldName = calculateFormFieldName(path);
      const storageKey = getStorageKey(formContext, nested ? object : undefined, path);
      const valueFromStorage = storageGet(sessionStore, storageKey);
      const nestedForm = lrs.getResourceProperty(field, form.form) as SomeNode;

      let value = valueFromStorage || lrs.getResourceProperties(object, path);
      dependentResources.push(...value.filter(isResource));

      if (isCollection(lrs, value)) {
        const members = lrs.dig(value[0] as SomeNode, collectionMembers) as SomeTerm[];
        dependentResources.push(...members.filter(isResource));
        value = members;
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

const useInitialValues = (sessionStore: Storage, actionBody: SomeNode, object: SomeNode, formID: string) => {
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

  return [loading, initialValues];
};

export default useInitialValues;
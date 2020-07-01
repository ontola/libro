import as from '@ontologies/as';
import { isNamedNode } from '@ontologies/core';
import sh from '@ontologies/shacl';
import {
  useDataFetching,
  useLRS,
} from 'link-redux';
import React from 'react';

import { entityIsLoaded, resourceHasType } from '../helpers/data';
import {
  collectionMembers,
  formFieldsPath,
  nestedFormsPath,
} from '../helpers/diggers';
import { calculateFormFieldName } from '../helpers/forms';
import { isResource } from '../helpers/types';
import form from '../ontology/form';
import { getStorageKey, storageGet } from '../helpers/persistence';

const isCollection = (lrs, value) => (
  value?.length === 1 && resourceHasType(lrs, value[0], as.Collection)
);

const getInitialValues = (lrs, sessionStore, addValue, parentForm, object, formContext, nested) => {
  const fields = lrs.dig(parentForm, formFieldsPath);
  const dependentResources = [
    parentForm,
    ...lrs.dig(parentForm, nestedFormsPath),
  ];

  fields.forEach((field) => {
    const path = lrs.getResourceProperty(field, sh.path);
    if (path) {
      const fieldName = calculateFormFieldName(path);
      const storageKey = getStorageKey(formContext, nested && object, path);
      const valueFromStorage = storageGet(sessionStore, storageKey);
      const nestedForm = lrs.getResourceProperty(field, form.form);

      let value = valueFromStorage || lrs.getResourceProperties(object, path);
      dependentResources.push(...value.filter(isResource));

      if (isCollection(lrs, value)) {
        const members = lrs.dig(value[0], collectionMembers);
        dependentResources.push(...members.filter(isResource));
        value = members;
      }

      if (nestedForm) {
        addValue(fieldName, value.map((nestedValue) => {
          const nestedObject = {
            '@id': nestedValue,
          };

          const nestedDependentResources = getInitialValues(
            lrs,
            sessionStore,
            (key, val) => {
              nestedObject[key] = val;
            },
            nestedForm,
            nestedValue,
            formContext,
            true
          );

          dependentResources.push(...nestedDependentResources);

          return nestedObject;
        }));
      } else {
        addValue(fieldName, value);
      }
    }
  });

  return dependentResources;
};

const useInitialValues = (sessionStore, actionBody, object, formID) => {
  const lrs = useLRS();
  const [timestamp, setTimestamp] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [initialValues, setInitialValues] = React.useState({});

  const dependentResources = React.useMemo(() => {
    if (!actionBody) {
      setLoading(false);

      return [];
    }

    const currentValues = {};
    const addValue = (key, value) => {
      if (!Object.keys(currentValues).includes(key)) {
        currentValues[key] = value;
      }
    };
    const dependencies = getInitialValues(lrs, sessionStore, addValue, actionBody, object, formID);

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

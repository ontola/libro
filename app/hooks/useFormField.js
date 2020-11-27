import rdf from '@ontologies/core';
import { useLRS } from 'link-redux';
import React from 'react';
import { useField } from 'react-final-form';

import { FormContext } from '../components/Form/Form';
import { FormSectionContext } from '../components/Form/FormSection';
import { arraysEqual } from '../helpers/data';
import { calculateFormFieldName } from '../helpers/forms';
import validators, { combineValidators } from '../helpers/validators';
import { getStorageKey, storageSet } from '../helpers/persistence';
import ll from '../ontology/ll';
import ontola from '../ontology/ontola';
import sp from '../ontology/sp';

const valueChanged = (oldValue, newValue) => {
  if (Array.isArray(newValue)) {
    return !arraysEqual(oldValue, newValue);
  }

  return oldValue !== newValue;
};

const changeDelta = (object, path, nextValue) => {
  if (!nextValue || nextValue.length === 0) {
    return [
      rdf.quad(
        object,
        path,
        sp.Variable,
        ontola.remove
      ),
    ];
  }

  return nextValue.map((val) => (
    rdf.quad(
      object,
      path,
      val['@id'] || val,
      ll.replace
    )
  ));
};

const useFormField = ({
  delay,
  initialValue,
  maxCount,
  maxLength,
  minCount,
  minLength,
  required,
  object,
  path,
  propertyIndex,
  sessionStore,
  useStorage,
}) => {
  const lrs = useLRS();
  const { formID } = React.useContext(FormContext);
  const formSectionContext = React.useContext(FormSectionContext);
  const fieldName = calculateFormFieldName(formSectionContext, propertyIndex, path);
  const storeKey = getStorageKey(formID, formSectionContext && object, path);
  const validate = combineValidators([
    maxCount && validators.maxCount(maxCount),
    maxLength && validators.maxLength(maxLength),
    minCount && validators.minCount(minCount),
    minLength && validators.minLength(minLength),
    required && validators.required,
  ]);
  const setDefaultValue = React.useCallback(
    useStorage
      ? (val) => storageSet(sessionStore, storeKey, val)
      : () => undefined,
    [storeKey]
  );
  const saveToLRS = React.useCallback((nextValue) => {
    const delta = object && changeDelta(object, path, nextValue);
    if (delta) {
      lrs.processDelta(delta, !delay);
    }
  });
  const saveToLocalStorage = React.useCallback((nextValue) => {
    if (storeKey) {
      setDefaultValue(nextValue.map((val) => val['@id'] || val));
    }
  });
  const [memoizedMeta, setMemoizedMeta] = React.useState({});
  const { input, meta } = useField(fieldName, {
    allowNull: true,
    format: (i) => i,
    initialValue,
    parse: (i) => i,
    validate,
    validateFields: [],
  });
  const originalOnChange = input.onChange;
  const onChange = React.useCallback((nextValue) => {
    if (meta.touched || valueChanged(nextValue, input.value)) {
      saveToLRS(nextValue);
      saveToLocalStorage(nextValue);
    }
    originalOnChange(nextValue);
  }, [storeKey, meta.touched, input.value]);
  React.useEffect(() => {
    if (input.value) {
      saveToLRS(input.value);
    }
  }, []);
  input.onChange = onChange;
  React.useEffect(() => {
    let error;
    if (meta.error) {
      error = Array.isArray(meta.error) ? meta.error : [meta.error];
    }
    setMemoizedMeta({
      ...meta,
      error,
    });
  }, [meta.touched, meta.error, meta.pristine, meta.dirtySinceLastSubmit]);

  return [input, memoizedMeta, storeKey];
};

export default useFormField;

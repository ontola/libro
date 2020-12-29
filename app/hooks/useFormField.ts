import rdf, { isNamedNode, NamedNode, SomeTerm } from '@ontologies/core';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import classNames from 'classnames';
import { SomeNode } from 'link-lib';
import {
  literal,
  useLink,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { useField } from 'react-final-form';

import { FormContext } from '../components/Form/Form';
import { FormFieldProps } from '../components/FormField/FormField';
import { arraysEqual } from '../helpers/data';
import {
  calculateFormFieldName,
  clearRemoval,
  destroyFieldName,
  JSONLDObject,
} from '../helpers/forms';
import { getStorageKey, storageSet } from '../helpers/persistence';
import { isJSONLDObject, isNumber } from '../helpers/types';
import validators, { combineValidators } from '../helpers/validators';
import ll from '../ontology/ll';
import ontola from '../ontology/ontola';
import sp from '../ontology/sp';

import useFieldShape from './useShapeProps';

export const fieldShapeType = PropTypes.shape({
  maxCount: PropTypes.number,
  maxLength: PropTypes.number,
  minCount: PropTypes.number,
  required: PropTypes.bool,
});

const mapFieldProps = {
  description: literal(schema.text),
  helperText: literal(ontola.helperText),
  label: literal(schema.name),
  path: sh.path,
};

export type InputValue = JSONLDObject | SomeTerm;

export interface UseFormFieldProps {
  addFieldName: (...prop: any) => any;
  alwaysVisible: boolean;
  delay?: boolean;
  newItem: (...prop: any) => any;
  path: NamedNode;
  preferPlaceholder?: boolean;
  propertyIndex: number;
  required: boolean;
  setHasContent: (hasContent: boolean) => any;
  sequenceIndex: number;
  storage: boolean;
  subject: SomeNode;
}

interface InputProps {
  value: InputValue[];
}

const valueChanged = (oldValue: InputValue[], newValue: InputValue[] | undefined) => {
  if (typeof newValue === 'undefined') {
    return true;
  }
  return !arraysEqual(oldValue, newValue);
};

const changeDelta = (object: SomeNode, path: NamedNode, nextValue: InputValue[]) => {
  if (!nextValue || nextValue.length === 0) {
    return [
      rdf.quad(
        object,
        path,
        sp.Variable,
        ontola.remove,
      ),
    ];
  }

  return nextValue.map((val) => (
    rdf.quad(
      object,
      path,
      isJSONLDObject(val) ? val['@id'] : val,
      ll.replace,
    )
  ));
};

const useInputValues = (
  input: InputProps,
  alwaysVisible: boolean,
  minCount: number | undefined,
  newItem: () => any,
) => {
  return React.useMemo(() => {
    let currentValue = input.value;

    if (currentValue && !Array.isArray(currentValue)) {
      currentValue = [currentValue];
    }

    if (!currentValue || currentValue.length === 0) {
      const showEmptyField = typeof minCount === 'undefined' ? alwaysVisible : minCount > 0;

      if (showEmptyField) {
        return [newItem()];
      }

      return [];
    }

    return currentValue;
  }, [input.value, alwaysVisible, minCount, newItem]);
};

const defaultProps = {
  alwaysVisible: true,
  delay: false,
  newItem: () => rdf.literal(''),
  storage: true,
};

const useFormField = (componentProps: UseFormFieldProps): FormFieldProps | {} => {
  const props = {
    ...defaultProps,
    ...componentProps,
  };

  const {
    addFieldName,
    alwaysVisible,
    delay,
    newItem,
    path,
    preferPlaceholder,
    propertyIndex,
    setHasContent,
    sequenceIndex,
    storage,
  } = props;

  const lrs = useLRS();
  const {
    autofocusForm,
    formID,
    formSection,
    object,
    sessionStore,
    submissionErrors,
    theme,
    whitelist,
  } = React.useContext(FormContext);
  const fieldProps = useLink(mapFieldProps);
  if (path) {
    fieldProps.path = path;
  }
  const namedPath = isNamedNode(fieldProps.path) ? fieldProps.path : undefined;
  const fieldShape = useFieldShape(props);
  const whitelisted = !whitelist || whitelist.includes(rdf.id(fieldProps.path));
  const fieldName = calculateFormFieldName(formSection, propertyIndex, namedPath);
  const storeKey = getStorageKey(formID || '', formSection ? object : undefined, namedPath);
  const validate = combineValidators([
    isNumber(fieldShape.maxCount) ? validators.maxCount(fieldShape.maxCount) : undefined,
    isNumber(fieldShape.maxLength) ? validators.maxLength(fieldShape.maxLength) : undefined,
    isNumber(fieldShape.minCount) ? validators.minCount(fieldShape.minCount) : undefined,
    isNumber(fieldShape.minLength) ? validators.minLength(fieldShape.minLength) : undefined,
    fieldShape.required ? validators.required : undefined,
  ]);
  const setDefaultValue = React.useCallback(
    storage
      ? (val) => storageSet(sessionStore, storeKey, val)
      : () => undefined,
    [storeKey],
  );
  const saveToLRS = React.useCallback((nextValue) => {
    const delta = object && namedPath && changeDelta(object, namedPath, nextValue);
    if (delta) {
      lrs.processDelta(delta, !delay);
    }
  }, [object, namedPath, delay]);
  const saveToLocalStorage = React.useCallback((nextValue: InputValue[]) => {
    if (storeKey) {
      setDefaultValue(nextValue.map((val) => isJSONLDObject(val) ? val['@id'] : val));
    }
  }, [storeKey, setDefaultValue]);
  const [memoizedMeta, setMemoizedMeta] = React.useState({});
  const { input, meta } = useField(fieldName, {
    allowNull: true,
    format: (i) => i,
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
    let err;
    if (meta.error) {
      err = Array.isArray(meta.error) ? meta.error : [meta.error];
    }
    setMemoizedMeta({
      ...meta,
      error: err,
    });
  }, [meta.touched, meta.error, meta.pristine, meta.dirtySinceLastSubmit]);

  React.useLayoutEffect(() => {
    if (whitelisted && setHasContent) {
      setHasContent(true);
    }
  }, [whitelisted, setHasContent]);
  React.useLayoutEffect(() => {
    if (input && addFieldName) {
      addFieldName(input.name);
    }
  }, [input?.name]);
  const addItem = React.useCallback(() => {
    const newValue = input.value?.slice() || [];

    const removedIndex = newValue.findIndex((value: InputValue) => (
      isJSONLDObject(value) ? value[destroyFieldName] === rdf.literal(true) : false
    ));

    if (removedIndex >= 0) {
      newValue[removedIndex] = clearRemoval(newValue[removedIndex] as JSONLDObject) as JSONLDObject;
    } else {
      newValue.push(newItem());
    }

    input.onChange(newValue);
  }, [input.value, input.onChange]);
  React.useEffect(() => {
    const empty = !input.value || input.value.length === 0;
    const shouldAdd = !alwaysVisible && isNumber(fieldShape.minCount) && fieldShape.minCount > 0;

    if (empty && shouldAdd) {
      addItem();
    }
  }, [input.value?.length, fieldShape.minCount, alwaysVisible]);
  const values = useInputValues(
    input,
    alwaysVisible,
    isNumber(fieldShape.minCount) ? fieldShape.minCount : undefined,
    newItem,
  );

  if (!whitelisted) {
    return {};
  }

  const {
    active,
    dirty,
    error,
    invalid,
  } = meta;
  const inputErrors = submissionErrors?.[input.name] || error;
  const className = classNames({
    'Field': true,
    [`Field--variant-${theme}`]: theme,
    'Field--active': active,
    'Field--dirty': dirty,
    'Field--error': !!inputErrors,
    'Field--warning': invalid,
  });

  const autofocus = autofocusForm && sequenceIndex === 0;

  return {
    addItem,
    autofocus,
    className,
    field: props.subject,
    fieldShape,
    inputErrors,
    meta: memoizedMeta,
    name: input.name,
    onChange: input.onChange,
    preferPlaceholder,
    storeKey,
    values,
    ...fieldProps,
  };
};

export default useFormField;

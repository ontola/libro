import rdf, { NamedNode, SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import {
  literal,
  useLRS,
  useLink,
} from 'link-redux';
import React from 'react';
import { useField } from 'react-final-form';

import { FormContext } from '../components/Form/Form';
import { FormFieldError, InputMeta } from '../components/FormField';
import { arraysEqual } from '../helpers/data';
import {
  JSONLDObject,
  calculateFormFieldName,
  clearRemoval,
  destroyFieldName,
} from '../helpers/forms';
import { getStorageKey, storageSet } from '../helpers/persistence';
import { isJSONLDObject, isNumber } from '../helpers/types';
import validators, { combineValidators } from '../helpers/validators';
import ll from '../ontology/ll';
import ontola from '../ontology/ontola';
import sp from '../ontology/sp';
import { useFormGroup } from '../views/FormGroup/FormGroupProvider';

import useFieldShape, { ShapeForm } from './useShapeProps';

const mapFieldProps = {
  description: literal(schema.text),
  helperText: literal(ontola.helperText),
  label: literal(schema.name),
  path: sh.path,
};

interface MapFieldPropsShape {
  description?: string;
  helperText?: string;
  label?: string;
  path: NamedNode;
}

export type InputValue = JSONLDObject | SomeTerm;

export interface UseFormFieldProps {
  alwaysVisible?: boolean;
  delay?: boolean;
  newItem?: (...prop: any) => InputValue;
  path?: NamedNode;
  preferPlaceholder?: boolean;
  storage?: boolean;
  subject?: SomeNode;
}

export interface ForbiddenFormField {
  name: string;
  onChange: (args: any) => void;
  values: InputValue[];
  whitelisted: false;
}

export interface PermittedFormField {
  addItem: () => any;
  autofocus: boolean;
  className: string;
  description?: string;
  field?: SomeNode;
  fieldShape: ShapeForm;
  helperText?: string;
  inputErrors: FormFieldError[];
  label?: string | React.ReactNode;
  meta: InputMeta;
  name: string;
  onChange: (args: any) => void;
  path: NamedNode;
  preferPlaceholder: boolean;
  storeKey: string;
  values: InputValue[];
  whitelisted: true;
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
  newItem: () => InputValue,
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

const useFormField = (componentProps: UseFormFieldProps): PermittedFormField | ForbiddenFormField => {
  const props = {
    ...defaultProps,
    ...componentProps,
  };
  const { addFieldName, fieldNames, groupIndex } = useFormGroup();
  const {
    alwaysVisible,
    delay,
    newItem,
    path,
    preferPlaceholder,
    storage,
  } = props;

  const lrs = useLRS();
  const {
    autofocusForm,
    blacklist,
    formID,
    formSection,
    object,
    sessionStore,
    submissionErrors,
    theme,
    whitelist,
  } = React.useContext(FormContext);
  const fieldProps = useLink(mapFieldProps) as MapFieldPropsShape;
  if (path) {
    fieldProps.path = path;
  }
  const whitelisted = !whitelist || whitelist.includes(rdf.id(fieldProps.path));
  const blacklisted = blacklist?.includes(rdf.id(fieldProps.path));
  const fieldName = calculateFormFieldName(formSection, fieldProps.path);
  if (blacklisted || !whitelisted) {
    return {
      name: fieldName,
      onChange: () => undefined,
      values: [],
      whitelisted: false,
    };
  }
  const fieldShape = useFieldShape(props);
  const storeKey = getStorageKey(formID || '', formSection ? object : undefined, fieldProps.path);
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
    const delta = object && fieldProps.path && changeDelta(object, fieldProps.path, nextValue);
    if (delta) {
      lrs.processDelta(delta, !delay);
    }
  }, [object, fieldProps.path, delay]);
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
    if (input && whitelisted && addFieldName) {
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

  const {
    active,
    dirty,
    error,
    invalid,
  } = meta;
  const inputErrors = submissionErrors?.[input.name] || error;
  const className = clsx({
    'Field': true,
    [`Field--variant-${theme}`]: theme,
    'Field--active': active,
    'Field--dirty': dirty,
    'Field--error': !!inputErrors,
    'Field--warning': invalid,
  });

  const autofocus = !!(autofocusForm && groupIndex === 0 && fieldNames.indexOf(fieldName) === 0);

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
    preferPlaceholder: !!preferPlaceholder,
    storeKey,
    values,
    whitelisted,
    ...fieldProps,
  };
};

export default useFormField;

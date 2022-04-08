import rdf, {
  NamedNode,
  SomeTerm,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import {
  LaxNode,
  literal,
  useLRS,
  useResourceLink,
} from 'link-redux';
import React from 'react';
import { useField } from 'react-final-form';

import { formContext } from '../components/Form/FormContext';
import { FormFieldError, InputMeta } from '../components/FormField';
import {
  fieldActiveCID,
  fieldVariantPreviewCID,
  useFormStyles,
} from '../components/FormField/UseFormStyles';
import { arraysEqual } from '../helpers/data';
import { JSONLDObject, calculateFormFieldName } from '../helpers/forms';
import { getStorageKey, storageSet } from '../helpers/persistence';
import { quadruple } from '../helpers/quadruple';
import {
  isJSONLDObject,
  isNumber,
  isString,
} from '../helpers/types';
import validators, { combineValidators } from '../helpers/validators';
import form from '../ontology/form';
import ld from '../ontology/ld';
import ontola from '../ontology/ontola';
import sp from '../ontology/sp';
import { useFormGroup } from '../views/FormGroup/FormGroupProvider';

import useAddFormValue from './useAddFormValue';
import useFieldShape, { ResolvedShapeForm } from './useShapeProps';

const mapFieldProps = {
  description: literal(schema.text),
  helperText: literal(ontola.helperText),
  label: literal(schema.name),
  path: sh.path,
  placeholder: literal(form.placeholder),
};

interface MapFieldPropsShape {
  description?: string;
  helperText?: string;
  label?: string;
  path: NamedNode;
  placeholder?: string;
}

export type InputValue = JSONLDObject | SomeTerm;
export type OnInputChange = (newValues: InputValue[]) => void;
export type FocusRelatedEventHandler = (e: React.FocusEvent<HTMLElement>) => void;
export type ItemFactory = () => InputValue;

export interface UseFormFieldProps {
  alwaysVisible?: boolean;
  delay?: boolean;
  newItem?: ItemFactory;
  storage?: boolean;
}

export interface ForbiddenFormField {
  field?: SomeNode;
  fieldShape: Record<string, never>;
  name: string;
  onChange: OnInputChange;
  values: InputValue[];
  whitelisted: false;
}

export interface PermittedFormField {
  addFormValue?: () => any;
  autofocus?: boolean;
  className?: string;
  description?: string;
  field?: SomeNode;
  fieldShape: ResolvedShapeForm;
  helperText?: string | null;
  inputErrors: FormFieldError[];
  label?: string | React.ReactNode;
  meta: InputMeta;
  name: string;
  onBlur: FocusRelatedEventHandler;
  onChange: OnInputChange;
  onFocus: FocusRelatedEventHandler;
  path?: NamedNode;
  placeholder?: string;
  storeKey?: string;
  values: InputValue[];
  whitelisted?: true;
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
      quadruple(
        object,
        path,
        sp.Variable,
        ontola.remove,
      ),
    ];
  }

  return nextValue.map((val) => (
    quadruple(
      object,
      path,
      isJSONLDObject(val) ? val['@id'] : val,
      ld.replace,
    )
  ));
};

const useInputValues = (
  input: InputProps,
  alwaysVisible: boolean,
  minCount: number | undefined,
  newItem: ItemFactory,
) => React.useMemo(() => {
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

const defaultProps = {
  alwaysVisible: true,
  delay: false,
  newItem: () => rdf.literal(''),
  storage: true,
};

const stringToRegex = (string: string) =>
  new RegExp(
    string
      .replace('\\A', '^')
      .replace('\\z', '$')
      .replace('?x-mi:', '')
      .replace(/\s/g, ''),
    'u',
  );

const useFormField = (field: LaxNode, componentProps: UseFormFieldProps = {}): PermittedFormField | ForbiddenFormField => {
  const props = {
    ...defaultProps,
    ...componentProps,
  };
  const { addFieldName, fieldNames, groupIndex } = useFormGroup();
  const {
    alwaysVisible,
    delay,
    newItem,
    storage,
  } = props;

  const lrs = useLRS();
  const classes = useFormStyles();

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
  } = React.useContext(formContext);

  const fieldProps = useResourceLink(field, mapFieldProps) as MapFieldPropsShape;
  const whitelisted = !whitelist || whitelist.includes(rdf.id(fieldProps.path));
  const blacklisted = blacklist?.includes(rdf.id(fieldProps.path));
  const fieldName = calculateFormFieldName(formSection, fieldProps.path ?? 'undefined');

  if (blacklisted || !whitelisted) {
    return {
      field,
      fieldShape: {},
      name: fieldName,
      onChange: () => undefined,
      values: [],
      whitelisted: false,
    };
  }

  const fieldShape = useFieldShape(field, alwaysVisible);
  const storeKey = getStorageKey(formID || '', formSection ? object : undefined, fieldProps.path);

  const validate = combineValidators([
    isNumber(fieldShape.maxCount) ? validators.maxCount(fieldShape.maxCount) : undefined,
    isNumber(fieldShape.maxLength) ? validators.maxLength(fieldShape.maxLength) : undefined,
    isNumber(fieldShape.minCount) ? validators.minCount(fieldShape.minCount) : undefined,
    isNumber(fieldShape.minLength) ? validators.minLength(fieldShape.minLength) : undefined,
    isString(fieldShape.pattern) ? validators.pattern(stringToRegex(fieldShape.pattern)) : undefined,
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

  const memoizedOnBlur = React.useCallback(input.onBlur, []);
  const memoizedOnFocus = React.useCallback(input.onFocus, []);

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

  const addFormValue = useAddFormValue(input.value, input.onChange, newItem);

  React.useEffect(() => {
    const empty = !input.value || input.value.length === 0;
    const shouldAdd = !alwaysVisible && isNumber(fieldShape.minCount) && fieldShape.minCount > 0;

    if (empty && shouldAdd) {
      addFormValue();
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
    dirtySinceLastSubmit,
    error,
  } = meta;

  const submissionError = dirtySinceLastSubmit ? undefined : submissionErrors?.[input.name];
  const inputErrors = submissionError || error;

  const className = clsx({
    [classes.field]: true,
    [fieldActiveCID]: active,
    [classes.fieldVariantDefault]: theme === 'default',
    [fieldVariantPreviewCID]: theme === 'preview',
    [classes.fieldVariantPreview]: theme === 'preview',
  });

  const autofocus = !!(autofocusForm && groupIndex === 0 && fieldNames.indexOf(fieldName) === 0);

  return {
    addFormValue,
    autofocus,
    className,
    field,
    fieldShape,
    inputErrors,
    meta: memoizedMeta,
    name: input.name,
    onBlur: memoizedOnBlur,
    onChange: input.onChange,
    onFocus: memoizedOnFocus,
    storeKey,
    values,
    whitelisted,
    ...fieldProps,
  };
};

export default useFormField;

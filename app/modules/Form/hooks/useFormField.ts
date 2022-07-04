import rdf, {
  NamedNode,
  SomeTerm,
  isNamedNode,
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

import ld from '../../Kernel/ontology/ld';
import sp from '../../Kernel/ontology/sp';
import { arraysEqual } from '../../Common/lib/data';
import { getStorageKey, storageSet } from '../../Common/lib/persistence';
import { quadruple } from '../../Kernel/lib/quadruple';
import { isNumber } from '../../Kernel/lib/typeCheckers';
import ontola from '../../Kernel/ontology/ontola';
import { formContext } from '../components/Form/FormContext';
import {
  FormField,
  FormFieldError,
  InputMeta,
  InputValue,
  ItemFactory,
} from '../components/FormField/FormFieldTypes';
import {
  fieldActiveCID,
  fieldVariantPreviewCID,
  useFormStyles,
} from '../components/FormField/UseFormStyles';
import {
  calculateFormFieldName,
  destroyFieldName,
  isJSONLDObject,
  retrieveIdFromValue,
} from '../lib/helpers';
import useValidators from '../lib/validators';
import form from '../ontology/form';
import { useFormGroup } from '../views/FormGroup/FormGroupProvider';

import useAddFormValue from './useAddFormValue';
import useFieldShape from './useFieldShape';

const mapFieldProps = {
  description: literal(schema.text),
  helperText: literal(form.helperText),
  label: literal(schema.name),
  path: sh.path,
  placeholder: literal(form.placeholder),
  startAdornment: literal(form.startAdornment),
};

interface MapFieldPropsShape {
  description?: string;
  helperText?: string;
  label?: string;
  path: NamedNode;
  placeholder?: string;
  startAdornment?: string;
}

export interface UseFormFieldProps {
  alwaysVisible?: boolean;
  delay?: boolean;
  newItem?: ItemFactory;
  storage?: boolean;
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

const useRenderedErrors = (name: string, meta: InputMeta) => {
  const { submissionErrors } = React.useContext(formContext);

  return React.useMemo<FormFieldError[]>(() => {
    const {
      error,
      dirtySinceLastSubmit,
      touched,
    } = meta;

    if (submissionErrors?.[name] && !dirtySinceLastSubmit) {
      return submissionErrors[name];
    }

    if (touched) {
      return error ?? [];
    }

    return [];
  }, [meta, submissionErrors]);
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

const useFormField = (field: LaxNode, componentProps: UseFormFieldProps = {}): FormField => {
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
    theme,
    whitelist,
  } = React.useContext(formContext);

  const fieldProps = useResourceLink(field, mapFieldProps) as MapFieldPropsShape;
  const whitelisted = !whitelist || whitelist.includes(rdf.id(fieldProps.path));
  const blacklisted = blacklist?.includes(rdf.id(fieldProps.path));
  const fieldName = fieldProps.path ? calculateFormFieldName(formSection, fieldProps.path) : undefined;

  if (blacklisted || !whitelisted) {
    return {
      field,
      fieldShape: {},
      name: fieldName ?? '',
      onChange: () => undefined,
      values: [],
      whitelisted: false,
    };
  }

  const fieldShape = useFieldShape(field, alwaysVisible);
  const storeKey = getStorageKey(formID || '', formSection ? object : undefined, fieldProps.path);

  const validate = useValidators(fieldShape);

  const setDefaultValue = React.useCallback(
    storage
      ? (val: SomeTerm[]) => storageSet(sessionStore, storeKey, val)
      : () => undefined,
    [storeKey],
  );

  const saveToLRS = React.useCallback((nextValue: InputValue[]) => {
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

  const { input, meta } = useField(fieldName ?? 'undefined', {
    allowNull: true,
    format: (i) => i,
    parse: (i) => i,
    validate,
    validateFields: [],
  });

  const memoizedOnBlur = React.useCallback(input.onBlur, []);
  const memoizedOnFocus = React.useCallback(input.onFocus, []);

  const originalOnChange = input.onChange;

  const onChange = React.useCallback((nextValue: InputValue[]) => {
    if (!fieldName) {
      return;
    }

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
  }, [meta.touched, meta.error, meta.pristine, meta.dirtySinceLastSubmit, meta.active]);

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

  const removeItem = React.useCallback((index: number) => {
    const newValue = values.slice();
    const currentValue = newValue[index];

    if (isJSONLDObject(currentValue) && isNamedNode(retrieveIdFromValue(currentValue))) {
      currentValue[destroyFieldName] = rdf.literal(true);
    } else {
      newValue.splice(index, 1);
    }

    input.onChange(newValue);
  }, [values, input.onChange]);

  const inputErrors = useRenderedErrors(input.name, memoizedMeta);

  const { active } = meta;
  const className = clsx({
    [classes.field]: true,
    [fieldActiveCID]: active,
    [classes.fieldVariantDefault]: theme === 'default',
    [fieldVariantPreviewCID]: theme === 'preview',
    [classes.fieldVariantPreview]: theme === 'preview',
  });

  const autofocus = !!(autofocusForm && groupIndex === 0 && fieldNames.indexOf(fieldName ?? '') === 0);

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
    removeItem,
    storeKey,
    values,
    whitelisted,
    ...fieldProps,
  };
};

export default useFormField;

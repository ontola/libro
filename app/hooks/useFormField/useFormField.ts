import rdf, { NamedNode } from '@ontologies/core';
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

import { FormContext } from '../../components/Form/Form';
import {
  fieldActiveCID,
  fieldErrorCID,
  fieldVariantPreviewCID,
  useFormStyles,
} from '../../components/FormField/FormField';
import { arraysEqual } from '../../helpers/data';
import { calculateFormFieldName } from '../../helpers/forms';
import { getStorageKey } from '../../helpers/persistence';
import { isJSONLDObject, isNumber } from '../../helpers/types';
import { diffError } from '../../helpers/validators';
import form from '../../ontology/form';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';
import sp from '../../ontology/sp';
import { useFormGroup } from '../../views/FormGroup/FormGroupProvider';
import useAddFormValue from '../useAddFormValue';
import useFieldShape from '../useShapeProps';

import {
  ForbiddenFormField,
  InputValue,
  PermittedFormField,
  UseFormFieldProps,
} from './types';
import { useInputValues } from './useInputValue';
import { useMemoizedField } from './useMemoizedField';
import { useStorage } from './useStorage';
import { useValidate } from './useValidate';

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

const defaultProps = {
  alwaysVisible: true,
  delay: false,
  newItem: () => rdf.literal(''),
  storage: true,
};

const shouldAutoFocus = (autofocusForm: boolean | undefined, groupIndex: number, isFirstField: boolean) => !!(autofocusForm && groupIndex === 0 && isFirstField);

export const useFormField = (field: LaxNode, componentProps: UseFormFieldProps = {}): PermittedFormField | ForbiddenFormField => {
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
  } = React.useContext(FormContext);

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

  const saveToLRS = React.useCallback((nextValue) => {
    const delta = object && fieldProps.path && changeDelta(object, fieldProps.path, nextValue);

    if (delta) {
      lrs.processDelta(delta, !delay);
    }
  }, [object, fieldProps.path, delay]);

  const storeKey = getStorageKey(formID || '', formSection ? object : undefined, fieldProps.path);
  const saveToLocalStorage = useStorage(storage, sessionStore, storeKey);

  const fieldShape = useFieldShape(field, alwaysVisible);
  const validate = useValidate(fieldShape);

  const { input, meta } = useMemoizedField(fieldName, {
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
    fieldShape.minCount,
    newItem,
  );

  const {
    active,
    dirtySinceLastSubmit,
    touched,
  } = meta;

  const submissionError = dirtySinceLastSubmit ? undefined : submissionErrors?.[input.name];

  const inputErrors = React.useMemo(() => submissionError || meta.error, [meta.error, diffError(submissionError)]);

  const showError = touched && !!inputErrors;

  const className = clsx({
    [classes.field]: true,
    [fieldActiveCID]: active,
    [fieldErrorCID]: showError,
    [classes.fieldVariantDefault]: theme === 'default',
    [fieldVariantPreviewCID]: theme === 'preview',
    [classes.fieldVariantPreview]: theme === 'preview',
  });

  const isFirstField = fieldNames?.indexOf(fieldName) === 0;
  const autofocus = shouldAutoFocus(autofocusForm, groupIndex, isFirstField);

  return {
    addFormValue,
    autofocus,
    className,
    field,
    fieldShape,
    inputErrors,
    meta,
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

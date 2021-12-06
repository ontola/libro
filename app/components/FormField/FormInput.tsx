import { DraggableSyntheticListeners } from '@dnd-kit/core';
import rdf, { isTerm } from '@ontologies/core';
import React, { CSSProperties } from 'react';
import FontAwesome from 'react-fontawesome';

import { isMarkedForRemove } from '../../helpers/forms';
import { InputValue } from '../../hooks/useFormField';
import Button from '../Button';

import { FormFieldContext } from './FormField';
import FormFieldHelper from './FormFieldHelper';

export interface SortableProps {
  attributes: {
    role: string;
    tabIndex: number;
    'aria-pressed': boolean | undefined;
    'aria-roledescription': string;
    'aria-describedby': string;
  };
  listeners: DraggableSyntheticListeners;
  setNodeRef: (node: HTMLElement | null) => void;
  style: CSSProperties;
}

export interface FormInputProps {
  index: number;
  sortableProps?: SortableProps;
  value: InputValue;
}

const FormInput: React.FC<FormInputProps> = ({
  index,
  value,
  sortableProps,
}) => {
  const {
    inputErrors,
    autofocus,
    fieldShape,
    inputComponent: InputComponent,
    onChange,
    removeItem,
    values,
  } = React.useContext(FormFieldContext);
  const { removable } = fieldShape;

  if (isMarkedForRemove(value)) {
    return null;
  }

  const inputOnChange = React.useCallback((val: InputValue) => {
    const newValue = values?.slice() || [];
    newValue[index] = isTerm(val) ? val : rdf.literal(val ?? '');
    onChange(newValue);
  }, [values, index, onChange]);

  const errors = React.useMemo(() => (
    inputErrors.filter((err) => err?.index === index)
  ), [inputErrors, index]);

  return (
    <div
      className="Field__wrapper"
      ref={sortableProps?.setNodeRef}
      style={sortableProps?.style}
    >
      <InputComponent
        autofocus={(autofocus && index === 0) ?? false}
        errors={errors}
        inputIndex={index}
        inputValue={value}
        onChange={inputOnChange}
      />
      <div className="Field__wrapper-buttons">
        {removable && (
          <Button
            plain
            onClick={() => removeItem(index)}
          >
            <FontAwesome name="times" />
          </Button>
        )}
        {sortableProps && (
          <div
            {...sortableProps.listeners}
            {...sortableProps.attributes}
          >
            <FontAwesome name="arrows" />
          </div>
        )}
      </div>
      <FormFieldHelper
        error={errors?.[0]}
        value={value}
      />
    </div>
  );
};

export default FormInput;

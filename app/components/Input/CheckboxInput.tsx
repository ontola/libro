import schema from '@ontologies/schema';
import { useProperty } from 'link-redux';
import React from 'react';

import FieldLabel from '../FieldLabel';
import { InputComponentProps } from '../FormField/FormInputs';
import { InputType } from './Input';

import InputElement from './InputElement';

interface PropTypes {
  name: string;
}

const CheckboxTrailer: React.FC<PropTypes> = ({ name }) => {
  const [label] = useProperty(schema.name);

  return (
    <FieldLabel
      htmlFor={name}
      label={label?.value}
    />
  );
};

const CheckboxInput = (fieldProps: InputComponentProps) => (
  <InputElement
    {...fieldProps}
    trailer={CheckboxTrailer}
    type={InputType.Checkbox}
  />
);

export default CheckboxInput;

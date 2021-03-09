import rdf from '@ontologies/core';
import React, { EventHandler } from 'react';

import { InputValue } from '../../hooks/useFormField';
import { MAX_POSTAL_DIGITS, MIN_POSTAL_DIGITS } from '../../views/Glapp/helpers';
import { InputComponentProps } from '../FormField/FormInputs';

interface SingleInputProps {
  className?: string;
  id: string;
  inputIndex: number;
  inputValue: InputValue;
  onChange: EventHandler<any>;
  rangeIndex: number;
}

const PostalDigitsInput: React.FC<SingleInputProps> = ({
  className,
  id,
  inputIndex,
  inputValue,
  rangeIndex,
  onChange,
}) => {
  const splitRange = inputValue.value.split('-');

  const handleChange = (e: any) => {
    const newRange = splitRange.slice();
    newRange[rangeIndex] = e.target.value;

    onChange(rdf.literal(newRange.join('-')));
  };

  return (
    <input
      className={className}
      max={MAX_POSTAL_DIGITS}
      min={MIN_POSTAL_DIGITS}
      name={`${id}-${inputIndex}-${rangeIndex}`}
      type="number"
      value={splitRange[rangeIndex]}
      onChange={handleChange}
    />
  );
};

const style = { marginBottom: '0.5em' };

const PostalRangeInput = (props: InputComponentProps): JSX.Element => {
  const compProps = {
    index: 0,
    ...props,
  };

  return (
    <div style={style}>
      <PostalDigitsInput rangeIndex={0} {...compProps} />
      -
      <PostalDigitsInput rangeIndex={1} {...compProps} />
    </div>
  );
};

export default PostalRangeInput;

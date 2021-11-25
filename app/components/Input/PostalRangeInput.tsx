import rdf from '@ontologies/core';
import React from 'react';

import { FormFieldContext } from '../FormField/FormField';
import { InputComponentProps } from '../FormField/InputComponentProps';

export const MAX_POSTAL_DIGITS = 9999;
export const MIN_POSTAL_DIGITS = 1000;

interface SingleInputProps extends InputComponentProps{
  rangeIndex: number;
}

const PostalDigitsInput: React.FC<SingleInputProps> = ({
  inputIndex,
  inputValue,
  rangeIndex,
  onChange,
}) => {
  const { name } = React.useContext(FormFieldContext);
  const splitRange = inputValue.value.split('-');

  const handleChange = (e: any) => {
    const newRange = splitRange.slice();
    newRange[rangeIndex] = e.target.value;

    onChange(rdf.literal(newRange.join('-')));
  };

  return (
    <input
      className="Field__input Field__input--postalRange"
      max={MAX_POSTAL_DIGITS}
      min={MIN_POSTAL_DIGITS}
      name={`${name}-${inputIndex}-${rangeIndex}`}
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
      <PostalDigitsInput
        rangeIndex={0}
        {...compProps}
      />
      -
      <PostalDigitsInput
        rangeIndex={1}
        {...compProps}
      />
    </div>
  );
};

export default PostalRangeInput;

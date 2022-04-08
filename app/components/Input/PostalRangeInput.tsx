import { makeStyles } from '@material-ui/styles';
import rdf from '@ontologies/core';
import clsx from 'clsx';
import React from 'react';

import { FormFieldContext } from '../FormField/FormField';
import { InputComponentProps } from '../FormField/InputComponentProps';
import { fieldInputCID, useFormStyles } from '../FormField/UseFormStyles';

export const MAX_POSTAL_DIGITS = 9999;
export const MIN_POSTAL_DIGITS = 1000;

interface SingleInputProps extends InputComponentProps{
  className: string;
  rangeIndex: number;
}

const useStyles = makeStyles({
  fieldInputPostalRage: {
    display: 'inline-block',
  },
  inputWrapper: {
    marginBottom: '.5em',
  },
});

const PostalDigitsInput: React.FC<SingleInputProps> = ({
  className,
  inputIndex,
  inputValue,
  rangeIndex,
  onChange,
}) => {
  const {
    name,
    onBlur,
    onFocus,
  } = React.useContext(FormFieldContext);
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
      name={`${name}-${inputIndex}-${rangeIndex}`}
      type="number"
      value={splitRange[rangeIndex]}
      onBlur={onBlur}
      onChange={handleChange}
      onFocus={onFocus}
    />
  );
};

const PostalRangeInput = (props: InputComponentProps): JSX.Element => {
  const classes = useStyles();
  const formClasses = useFormStyles();

  const compProps = {
    className: clsx(fieldInputCID, formClasses.fieldInput, classes.fieldInputPostalRage),
    index: 0,
    ...props,
  };

  return (
    <div className={classes.inputWrapper}>
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

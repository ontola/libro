import { makeStyles } from '@material-ui/styles';
import rdf from '@ontologies/core';
import clsx from 'clsx';
import React from 'react';

import { FormFieldContext, fieldInputCID } from '../FormField/FormField';
import { InputComponentProps } from '../FormField/InputComponentProps';

export const MAX_POSTAL_DIGITS = 9999;
export const MIN_POSTAL_DIGITS = 1000;

interface SingleInputProps extends InputComponentProps{
  rangeIndex: number;
}

const useStyles = makeStyles({
  inputWrapper: {
    marginBottom: '.5em',
  },
});

const PostalDigitsInput: React.FC<SingleInputProps> = ({
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
      className={clsx(fieldInputCID, 'Field__input', 'Field__input--postalRange')}
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

  const compProps = {
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

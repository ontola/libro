import { makeStyles } from '@material-ui/styles';
import rdf from '@ontologies/core';
import React, { EventHandler } from 'react';

import { FocusRelatedEventHandler, InputValue } from '../../hooks/useFormField';
import { InputComponentProps } from '../FormField/InputComponentProps';

export const MAX_POSTAL_DIGITS = 9999;
export const MIN_POSTAL_DIGITS = 1000;

interface SingleInputProps {
  className?: string;
  id: string;
  inputIndex: number;
  inputValue: InputValue;
  onBlur: FocusRelatedEventHandler;
  onChange: EventHandler<any>;
  onFocus: FocusRelatedEventHandler;
  rangeIndex: number;
}

const useStyles = makeStyles({
  inputWrapper: {
    marginBottom: '.5em',
  },
});

const PostalDigitsInput: React.FC<SingleInputProps> = ({
  id,
  inputIndex,
  inputValue,
  rangeIndex,
  onBlur,
  onChange,
  onFocus,
}) => {
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
      name={`${id}-${inputIndex}-${rangeIndex}`}
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

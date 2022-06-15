import PropTypes from 'prop-types';
import React from 'react';
import { useFormState } from 'react-final-form';
import FontAwesome from 'react-fontawesome';

import { useFormGroup } from './FormGroupProvider';

interface PropTypes {
  className: string;
}

const FormGroupErrorCount: React.FC<PropTypes> = ({
  className,
}) => {
  const { fieldNames } = useFormGroup();
  const formState = useFormState({
    subscription: {
      errors: true,
    },
  });

  const invalidCount = formState.errors === undefined
    ? 0
    : Object
      .keys(formState.errors)
      .filter((i) => fieldNames.includes(i))
      .length;

  if (invalidCount === 0) {
    return null;
  }

  return (
    <div className={className}>
      <FontAwesome name="exclamation-circle" />
      {invalidCount}
    </div>
  );
};

export default FormGroupErrorCount;

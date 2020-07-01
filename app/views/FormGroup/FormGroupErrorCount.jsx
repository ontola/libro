import PropTypes from 'prop-types';
import React from 'react';
import { useFormState } from 'react-final-form';
import FontAwesome from 'react-fontawesome';

const FormGroupErrorCount = ({
  className,
  fieldNames,
}) => {
  const formState = useFormState({
    subscription: {
      errors: true,
    },
  });

  const invalidCount = Object
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

FormGroupErrorCount.propTypes = {
  className: PropTypes.string,
  fieldNames: PropTypes.arrayOf(PropTypes.string),
};

export default FormGroupErrorCount;

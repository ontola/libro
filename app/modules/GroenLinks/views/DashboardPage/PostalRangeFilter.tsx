import rdf, {
  Literal,
  SomeTerm,
  isLiteral,
} from '@ontologies/core';
import clsx from 'clsx';
import React from 'react';

import FormField, { useFormStyles } from '../../../../components/FormField/FormField';
import PostalRangeInput from '../../../../components/Input/PostalRangeInput';
import useAddFormValue from '../../../../hooks/useAddFormValue';
import { InputValue } from '../../../../hooks/useFormField';

interface PostalRangeFilterProps {
  label: string;
  postalRanges: SomeTerm[];
  setPostalRange: (newValue: Literal[]) => void;
}

const newItem = () => rdf.literal('');

const PostalRangeFilter: React.FC<PostalRangeFilterProps> = ({
  label,
  postalRanges,
  setPostalRange,
}) => {
  const handleChange = React.useCallback((newValues: InputValue[]) => {
    setPostalRange(newValues.filter(isLiteral));
  }, [setPostalRange]);
  const addFormValue = useAddFormValue(postalRanges, handleChange, newItem);
  const classes = useFormStyles();

  return (
    <FormField
      addFormValue={addFormValue}
      className={clsx(classes.field, classes.fieldVariantDefault, 'Field--postalRange')}
      fieldShape={{
        removable: true,
      }}
      inputComponent={PostalRangeInput}
      label={label}
      name="postal-range"
      values={postalRanges}
      onChange={handleChange}
    />
  );
};

export default PostalRangeFilter;

import rdf, {
  Literal,
  SomeTerm,
  isLiteral,
} from '@ontologies/core';
import clsx from 'clsx';
import React from 'react';

import FormField from '../../../Form/components/FormField/FormField';
import { InputValue } from '../../../Form/components/FormField/FormFieldTypes';
import { useFormStyles } from '../../../Form/components/FormField/UseFormStyles';
import PostalRangeInput from '../../../Form/components/Input/PostalRangeInput';
import useAddFormValue from '../../../Form/hooks/useAddFormValue';

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

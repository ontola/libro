import React from 'react';
import { useForm } from 'react-final-form';

export const useSetFocusToActiveField = (field: string): void => {
  const { mutators } = useForm();

  React.useEffect(() => {
    mutators?.focusField(field);
  }, [field]);
};

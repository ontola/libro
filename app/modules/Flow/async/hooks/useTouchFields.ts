import React from 'react';
import { useForm } from 'react-final-form';

export const useTouchFields = (currentIndex: number, fieldsAmount: number): void => {
  const { mutators } = useForm();

  React.useEffect(() => {
    if (currentIndex === fieldsAmount) {
      mutators.touchFields && mutators.touchFields();
    }
  }, [currentIndex, fieldsAmount]);
};

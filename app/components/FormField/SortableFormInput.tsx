import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

import FormInput, { FormInputProps, SortableProps } from './FormInput';
import { orderId } from './SortableFormInputs';

const SortableFormInput = (props: FormInputProps): JSX.Element => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: orderId(props.value),
  });
  const sortableProps = React.useMemo<SortableProps>(() => {
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return {
      attributes,
      listeners,
      setNodeRef,
      style,
    };
  }, [
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  ]);

  return (
    <FormInput
      {...props}
      sortableProps={sortableProps}
    />
  );
};

export default SortableFormInput;

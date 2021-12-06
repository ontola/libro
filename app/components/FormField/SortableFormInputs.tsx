import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import rdf from '@ontologies/core';
import React from 'react';

import { isJSONLDObject } from '../../helpers/types';
import { InputValue } from '../../hooks/useFormField';
import argu from '../../ontology/argu';

import { FormFieldContext } from './FormField';
import FormInputs from './FormInputs';

export const orderId = (value: InputValue): string => isJSONLDObject(value) ? value['@id'].value : value.value;

const reorder = (list: InputValue[], from: string, to: string) => {
  const result = Array.from(list);
  const fromIndex = list.findIndex((value) => orderId(value) == from);
  const toIndex = list.findIndex((value) => orderId(value) == to);
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);

  return result.map((value, index) => ({
    ...value,
    [btoa(argu.order.value)]: [rdf.literal(index)],
  }));
};

const SortableFormInputs = (): JSX.Element | null => {
  const {
    onChange,
    values,
  } = React.useContext(FormFieldContext);

  if (!values) {
    return null;
  }

  const currentItems = values.map(orderId);
  const [items, setItems] = React.useState(currentItems);
  React.useEffect(() => {
    setItems(currentItems);
  }, [values]);
  const handleDragDrop = React.useCallback((event) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const reordered = reorder(
        values,
        active.id,
        over.id,
      );

      setItems(reordered.map(orderId));
      onChange(reordered);
    }
  }, [onChange, values]);

  return (
    <DndContext onDragEnd={handleDragDrop}>
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <FormInputs />
      </SortableContext>
    </DndContext>
  );
};

export default SortableFormInputs;

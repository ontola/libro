import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import rdf from '@ontologies/core';
import React from 'react';

import argu from '../../../Argu/ontology/argu';
import { isJSONLDObject } from '../../../Common/lib/typeCheckers';
import FormFieldAddButton from '../../components/FormField/FormFieldAddButton';
import { formFieldContext } from '../../components/FormField/FormFieldContext';
import { InputValue } from '../../components/FormField/FormFieldTypes';

import SortableInput from './SortableInput';

export const orderId = (value: InputValue): string => isJSONLDObject(value) ? value['@id'].value : value.value;

const reorder = (list: InputValue[], from: string, to: string) => {
  const result = Array.from(list);
  const fromIndex = list.findIndex((value) => orderId(value) == from);
  const toIndex = list.findIndex((value) => orderId(value) == to);
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);

  return result.map((value, index) => ({
    ...value,
    [btoa(argu.order.value)]: [rdf.literal(index + 1)],
  }));
};

const SortableInputs = (): JSX.Element | null => {
  const {
    onChange,
    values,
  } = React.useContext(formFieldContext);

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

  if (!values) {
    return null;
  }

  return (
    <DndContext onDragOver={handleDragDrop}>
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {values.map((value, index) => (
          <SortableInput
            index={index}
            key={index}
            value={value}
          />
        ))}
        <FormFieldAddButton />
      </SortableContext>
    </DndContext>
  );
};

export default SortableInputs;

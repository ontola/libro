import rdf, { isLiteral, isTerm, SomeTerm } from '@ontologies/core';
import { Resource } from 'link-redux';
import React, { EventHandler } from 'react';
import VirtualList from 'react-tiny-virtual-list';

const DEFAULT_HEIGHT = 200;
const ITEM_HEIGHT = 42;

const listStyle = {
  overflowX: 'hidden',
};

export interface SelectInputListProps {
  emptyText: string;
  getItemProps: EventHandler<any>;
  highlightedIndex: number | null;
  items: SomeTerm[];
  loading: boolean;
  maxItems: number;
  selectedItem: SomeTerm;
}

const SelectInputList: React.FC<SelectInputListProps> = ({
  emptyText,
  getItemProps,
  highlightedIndex,
  items,
  loading,
  maxItems,
  selectedItem,
}) => {
  let itemsToShow = items as Array<SomeTerm | string>;

  if (loading) {
    itemsToShow = ['Loading'];
  }

  if (itemsToShow.length === 0) {
    itemsToShow = [emptyText];
  }

  const height = itemsToShow.length < maxItems
    ? itemsToShow.length * ITEM_HEIGHT
    : DEFAULT_HEIGHT;

  return (
    <VirtualList
      className="Field__list"
      height={height}
      itemCount={itemsToShow.length}
      itemSize={ITEM_HEIGHT}
      renderItem={({ index, style }) => {
        const item = itemsToShow[index];
        const itemProps = getItemProps({
          disabled: !isTerm(item),
          index,
          item,
          key: isTerm(item) ? item.value : item,
          style: {
            backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
            fontWeight: rdf.equals(selectedItem, item) ? 'bold' : 'normal',
            height: ITEM_HEIGHT,
            ...style,
          },
        });

        if (typeof item === 'string' || isLiteral(item.termType)) {
          const value = typeof item === 'string' ? item : item.value;

          return (
            <option
              className="Field__list-element"
              value={value}
              {...itemProps}
            >
              {value}
            </option>
          );
        }

        return (
          <Resource
            {...itemProps}
            subject={item}
          />
        );
      }}
      scrollToAlignment={'auto' as any}
      scrollToIndex={highlightedIndex || 0}
      style={listStyle as any}
    />
  );
};

export default SelectInputList;

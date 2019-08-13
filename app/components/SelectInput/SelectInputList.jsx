import VirtualList from 'react-tiny-virtual-list';
import { LinkedResourceContainer, linkType } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_HEIGHT = 200;
const ITEM_HEIGHT = 42;
const WIDTH = 300;

const SelectInputList = ({
  emptyText,
  getItemProps,
  highlightedIndex,
  items,
  loading,
  maxItems,
  selectedItem,
}) => {
  let itemsToShow = items;

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
        const itemProps = getItemProps({
          index,
          item: itemsToShow[index],
          key: itemsToShow[index].value,
          style: {
            backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
            fontWeight: selectedItem === itemsToShow[index] ? 'bold' : 'normal',
            height: ITEM_HEIGHT,
            ...style,
          },
        });

        if (typeof itemsToShow[index] === 'string' || itemsToShow[index].termType === 'Literal') {
          const value = typeof itemsToShow[index] === 'string' ? itemsToShow[index] : itemsToShow[index].value;

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
          <LinkedResourceContainer
            {...itemProps}
            subject={itemsToShow[index]}
          />
        );
      }}
      scrollToAlignment="auto"
      scrollToIndex={highlightedIndex || 0}
      style={{
        overflowX: 'hidden',
      }}
      width={WIDTH}
    />
  );
};

SelectInputList.propTypes = {
  emptyText: PropTypes.string,
  getItemProps: PropTypes.func,
  highlightedIndex: PropTypes.number,
  items: PropTypes.arrayOf(linkType),
  loading: PropTypes.bool,
  maxItems: PropTypes.number,
  selectedItem: linkType,
};

export default SelectInputList;

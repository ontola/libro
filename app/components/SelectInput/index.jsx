import Downshift from 'downshift';
import { linkedPropType, LinkedResourceContainer } from 'link-redux';
import React from 'react';
import VirtualList from 'react-tiny-virtual-list';
import PropTypes from 'prop-types';

import normalizedLower from '../../helpers/i18n';
import Select from '../../topologies/Select';
import { Input } from '../Input';

const DEFAULT_HEIGHT = 200;
const ITEM_HEIGHT = 42;
const MAX_ITEMS = 5;
const WIDTH = 300;

class SelectInput extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      linkedPropType,
    ])).isRequired,
    sharedProps: PropTypes.shape({
      autoFocus: PropTypes.bool,
      className: PropTypes.string,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      onFocus: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.renderList = this.renderList.bind(this);
    this.onUserAction = this.onUserAction.bind(this);
    this.state = {
      itemsToShow: [],
      shouldClose: false,
    };
  }

  onUserAction(changes) {
    this.setState((prevState) => {
      let selectedItem = changes.selectedItem || prevState.selectedItem;
      const isClosingMenu = Object.hasOwnProperty.call(changes, 'isOpen') && !changes.isOpen;

      let {
        inputValue,
        itemsToShow,
        shouldClose,
      } = prevState;

      if (changes.type === Downshift.stateChangeTypes.keyDownEscape
        && !isClosingMenu) {
        selectedItem = '';
      } else if (changes.type === Downshift.stateChangeTypes.clickItem) {
        shouldClose = true;
      }

      if (Object.hasOwnProperty.call(changes, 'inputValue')) {
        if (changes.type === Downshift.stateChangeTypes.keyDownEscape) {
          inputValue = this.userInputtedValue;
        } else {
          const nextVal = changes.inputValue;
          inputValue = nextVal;
          this.userInputtedValue = nextVal;
          shouldClose = false;
        }
      }

      const compareValue = inputValue && normalizedLower(typeof inputValue === 'string' ? inputValue : inputValue.value);
      itemsToShow = inputValue && this.props.options.length > MAX_ITEMS
        ? this.props.options.filter(item => normalizedLower(item.value).includes(compareValue))
        : this.props.options;

      if (Object.hasOwnProperty.call(changes, 'highlightedIndex')
        && (changes.type === Downshift.stateChangeTypes.keyDownArrowUp
        || changes.type === Downshift.stateChangeTypes.keyDownArrowDown)
      ) {
        inputValue = itemsToShow[changes.highlightedIndex];
      }

      if (isClosingMenu && selectedItem) {
        inputValue = selectedItem;
        this.userInputtedValue = selectedItem;
      }

      return {
        inputValue,
        itemsToShow,
        selectedItem,
        shouldClose,
      };
    });
  }

  renderList({
    getItemProps,
    highlightedIndex,
    selectedItem,
  }) {
    const { itemsToShow } = this.state;

    if (itemsToShow.length === 0) {
      itemsToShow.push('Geen matchende items');
    }

    const height = itemsToShow.length < MAX_ITEMS
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
              backgroundColor:
                highlightedIndex === index ? 'lightgray' : 'white',
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
  }

  render() {
    const { sharedProps } = this.props;

    return (
      <Downshift
        itemToString={item => (item ? item.value : '')}
        {...sharedProps}
        onChange={v => sharedProps.onChange({ target: { value: v } })}
        onUserAction={this.onUserAction}
      >
        {(downshiftOpts) => {
          const {
            getInputProps,
            getMenuProps,
            openMenu,
            isOpen,
          } = downshiftOpts;

          let list = null;

          if (isOpen) {
            list = this.renderList(downshiftOpts);
          }

          return (
            <div>
              <Input
                {...sharedProps}
                {...getInputProps({
                  onFocus: openMenu,
                })}
                onClick={openMenu}
              />
              <Select
                {...getMenuProps()}
                style={{
                  maxHeight: '20em',
                  position: 'fixed',
                }}
              >
                {list}
              </Select>
            </div>
          );
        }}
      </Downshift>
    );
  }
}

export default SelectInput;

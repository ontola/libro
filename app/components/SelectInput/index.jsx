import Downshift from 'downshift';
import { LinkedRenderStore } from 'link-lib';
import {
  linkedPropType,
  LinkedResourceContainer,
  linkType,
  useDataFetching,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React from 'react';
import VirtualList from 'react-tiny-virtual-list';
import PropTypes from 'prop-types';

import { listToArr } from '../../helpers/data';
import normalizedLower from '../../helpers/i18n';
import Select from '../../topologies/Select';
import { Input } from '../Input';
import { NS } from '../../helpers/LinkedRenderStore';
import { handle } from '../../helpers/logging';

const DEFAULT_HEIGHT = 200;
const ITEM_HEIGHT = 42;
const MAX_ITEMS = 5;
const WIDTH = 300;

export const optionsType = PropTypes.oneOfType([
  linkedPropType,
  PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    linkedPropType,
  ])),
]);

function calculateItemsToShow(state) {
  const { inputValue, options, selectedItem } = state;

  const compareValue = inputValue && normalizedLower(typeof inputValue === 'string' ? inputValue : inputValue.value);
  if (inputValue && inputValue !== selectedItem && options.length > MAX_ITEMS) {
    return options
      .filter(item => normalizedLower(item.value).includes(compareValue));
  }

  return options;
}

function updateOptions(state, props, lrs) {
  const nextOptions = Array.isArray(props.options)
    ? props.options
    : listToArr(lrs, [], props.options);

  if (nextOptions instanceof Promise || typeof nextOptions.then !== 'undefined') {
    return {
      ...state,
      itemsToShow: state.itemsToShow,
      loading: true,
    };
  }

  return {
    ...state,
    itemsToShow: calculateItemsToShow({
      inputValue: state.inputValue,
      options: nextOptions,
      selectedItem: state.selectedItem,
    }),
    loading: false,
    options: nextOptions,
  };
}

function onUserAction(changes, setState) {
  setState((prevState) => {
    const { stateChangeTypes } = Downshift;
    const { options } = prevState;
    let {
      inputValue,
      itemsToShow,
      shouldClose,
      userInputtedValue,
    } = prevState;

    let selectedItem = changes.selectedItem || prevState.selectedItem;
    const isClosingMenu = Object.hasOwnProperty.call(changes, 'isOpen') && !changes.isOpen;

    if (changes.type === stateChangeTypes.keyDownEscape
      && !isClosingMenu) {
      selectedItem = '';
    } else if ([stateChangeTypes.clickItem, stateChangeTypes.mouseUp].includes(changes.type)) {
      shouldClose = true;
    }

    if (Object.hasOwnProperty.call(changes, 'inputValue')) {
      if (changes.type === stateChangeTypes.keyDownEscape) {
        inputValue = userInputtedValue;
      } else {
        const nextVal = changes.inputValue;
        inputValue = nextVal;
        userInputtedValue = nextVal;
        shouldClose = false;
      }
    }

    itemsToShow = calculateItemsToShow({
      inputValue,
      options,
      selectedItem,
    });

    if (Object.hasOwnProperty.call(changes, 'highlightedIndex')
      && (changes.type === stateChangeTypes.keyDownArrowUp
        || changes.type === stateChangeTypes.keyDownArrowDown)) {
      inputValue = itemsToShow[changes.highlightedIndex];
    }

    if (isClosingMenu && selectedItem) {
      inputValue = selectedItem;
      userInputtedValue = selectedItem;
    }

    return {
      ...prevState,
      inputValue,
      itemsToShow,
      selectedItem,
      shouldClose,
      userInputtedValue,
    };
  });
}

function renderList(
  state,
  {
    getItemProps,
    highlightedIndex,
    selectedItem,
  }
) {
  let { itemsToShow } = state;

  if (state.loading) {
    itemsToShow = ['Loading'];
  }

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
}

function SelectInput(props) {
  const {
    initialSelectedItem,
    options,
    sharedProps,
  } = props;

  const [state, setState] = React.useState({
    itemsToShow: [],
    loading: true,
    shouldClose: false,
  });

  const lrs = useLRS();
  const subject = Array.isArray(options) ? undefined : options;
  const version = useDataInvalidation({ subject });
  useDataFetching({ subject }, version);
  React.useEffect(() => {
    setState(updateOptions(state, props, lrs));
  }, [options, version]);

  const itemToString = (item) => {
    if (!item) {
      return '';
    }

    if (item.termType && (item.termType === 'NamedNode' || item.termType === 'BlankNode')) {
      const itemClass = lrs.getResourceProperty(item, NS.rdf('type'));
      const classDisplayProp = lrs.getResourceProperty(
        itemClass,
        NS.ontola('forms/inputs/select/displayProp')
      ) || NS.schema('name');
      let label = lrs.getResourceProperty(item, classDisplayProp);
      if (!label) {
        handle(new TypeError(`Resource ${item} has no property ${classDisplayProp}`));
        label = lrs.getResourceProperty(item, NS.schema('name'));
      }

      return label ? label.value : item.value;
    }

    return item.value || item;
  };

  return (
    <Downshift
      initialInputValue={itemToString(initialSelectedItem)}
      initialSelectedItem={initialSelectedItem}
      itemToString={itemToString}
      {...sharedProps}
      onChange={v => sharedProps.onChange({ target: { value: v } })}
      onStateChange={changes => onUserAction(changes, setState)}
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
          list = renderList(state, downshiftOpts);
        } else {
          list = (
            <React.Fragment>
              <option aria-selected="false" className="AriaHidden">Focus to show items</option>
            </React.Fragment>
          );
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
              scrollIntoView={isOpen}
              {...getMenuProps()}
              style={{
                maxHeight: '20em',
                position: 'absolute',
                zIndex: 10,
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

SelectInput.propTypes = {
  initialSelectedItem: linkType,
  lrs: PropTypes.instanceOf(LinkedRenderStore),
  options: optionsType.isRequired,
  sharedProps: PropTypes.shape({
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
};

export default SelectInput;

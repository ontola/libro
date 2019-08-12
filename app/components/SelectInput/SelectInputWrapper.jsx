import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import {
  linkType,
  useLRS,
} from 'link-redux';
import { useDebouncedCallback } from 'use-debounce';

import normalizedLower from '../../helpers/i18n';
import { searchIri } from '../../views/SearchResult/searchHelper';

import SelectInputField, { MAX_ITEMS, itemToString } from './SelectInputField';

const DEBOUNCE_TIMER = 500;

function calculateItemsToShow(inputValue, selectedItem, options, lrs) {
  const compareValue = inputValue && normalizedLower(typeof inputValue === 'string' ? inputValue : inputValue.value);

  if (inputValue && inputValue !== selectedItem && options.length > MAX_ITEMS) {
    return options
      .filter(item => (
        normalizedLower(item.value).includes(compareValue)
          || normalizedLower(itemToString(item, lrs)).includes(compareValue)
      ));
  }

  return options;
}

function handleStateChange(options, changes, setState, lrs, searchTemplate, onOptionsChange) {
  setState((prevState) => {
    const { stateChangeTypes } = Downshift;
    let {
      inputValue,
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

    if (searchTemplate) {
      const compareValue = inputValue && normalizedLower(typeof inputValue === 'string' ? inputValue : inputValue.value);
      const searchResult = searchIri(searchTemplate.value, compareValue, 1, true);
      onOptionsChange(searchResult);
    }

    const itemsToShow = calculateItemsToShow(
      inputValue,
      selectedItem,
      options,
      lrs
    );

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

function updateOptions(state, options, lrs) {
  return {
    ...state,
    itemsToShow: calculateItemsToShow(
      state.inputValue,
      state.selectedItem,
      options,
      lrs
    ),
  };
}

const SelectInputWrapper = ({
  className,
  initialValue,
  inputValue,
  onOptionsChange,
  options,
  searchTemplate,
  sharedProps,
}) => {
  const lrs = useLRS();
  const [state, setState] = React.useState({
    itemsToShow: [],
    shouldClose: false,
  });
  React.useEffect(() => {
    setState(updateOptions(state, options, lrs));
  }, [options]);
  const [debouncedCallback] = useDebouncedCallback(
    changes => handleStateChange(
      options,
      changes,
      setState,
      lrs,
      searchTemplate,
      onOptionsChange
    ),
    searchTemplate ? DEBOUNCE_TIMER : 0
  );

  return (
    <div className={className}>
      <SelectInputField
        initialSelectedItem={inputValue || initialValue}
        items={state.itemsToShow}
        sharedProps={sharedProps}
        value={inputValue}
        onStateChange={debouncedCallback}
      />
    </div>
  );
};

SelectInputWrapper.propTypes = {
  className: PropTypes.string,
  initialValue: linkType,
  inputValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    linkType,
  ]),
  onOptionsChange: PropTypes.func,
  options: PropTypes.arrayOf(linkType),
  searchTemplate: linkType,
  sharedProps: PropTypes.shape({
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
};

export default SelectInputWrapper;

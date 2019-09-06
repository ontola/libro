import Downshift from 'downshift';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import {
  linkType,
  topologyType,
  useLRS,
} from 'link-redux';
import { useDebouncedCallback } from 'use-debounce';

import { LoadingRow } from '../Loading';
import RadioGroup from '../../topologies/RadioGroup';
import { entityIsLoaded } from '../../helpers/data';
import normalizedLower from '../../helpers/i18n';
import { NS } from '../../helpers/LinkedRenderStore';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';
import { searchIri } from '../../views/SearchResult/searchHelper';

import SelectInputField, { MAX_ITEMS, itemToString } from './SelectInputField';

const DEBOUNCE_TIMER = 500;
const DEFAULT_RADIO_ITEM_LIMIT = 5;
const MAX_RADIO_ITEMS = 20;
const MAX_SELECT_LABEL_LENGTH = 60;

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

function renderAsRadioGroup(topology, items, lrs, inputFieldHint) {
  if (inputFieldHint === NS.ontola('element/select') || topology === formFooterTopology) {
    return false;
  }
  if (inputFieldHint === NS.ontola('element/input/radio') || items.length <= DEFAULT_RADIO_ITEM_LIMIT) {
    return true;
  }
  if (items.length > MAX_RADIO_ITEMS) {
    return false;
  }

  const labels = items.map(item => itemToString(item, lrs));

  return labels.some(label => label.length > MAX_SELECT_LABEL_LENGTH);
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
  inputFieldHint,
  inputValue,
  loading,
  onOptionsChange,
  options,
  searchTemplate,
  sharedProps,
  topology,
}) => {
  const lrs = useLRS();
  const [state, setState] = React.useState({
    itemsToShow: [],
    shouldClose: false,
  });
  React.useEffect(() => {
    setState(updateOptions(state, options, lrs));
  }, [loading, options]);
  const [debouncedCallback] = useDebouncedCallback(
    changes => handleStateChange(
      options,
      changes,
      setState,
      lrs,
      searchTemplate,
      onOptionsChange
    ),
    searchTemplate ? DEBOUNCE_TIMER : 0,
    { leading: true }
  );

  const initialSelectedItem = inputValue || initialValue;

  if (__CLIENT__ && initialSelectedItem && initialSelectedItem.termType === 'NamedNode' && !entityIsLoaded(lrs, initialSelectedItem)) {
    lrs.getEntity(initialSelectedItem);

    return <LoadingRow />;
  }

  if (!searchTemplate && renderAsRadioGroup(topology, options, lrs, inputFieldHint)) {
    return (
      <RadioGroup
        items={options}
        loading={loading}
        value={inputValue?.value}
        onChange={(event, v) => sharedProps.onChange({ target: { value: NamedNode.find(v) } })}
      />
    );
  }

  return (
    <div className={className}>
      <SelectInputField
        initialSelectedItem={initialSelectedItem}
        items={state.itemsToShow}
        loading={loading}
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
  inputFieldHint: linkType,
  inputValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    linkType,
  ]),
  loading: PropTypes.bool,
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
  topology: topologyType,
};

export default SelectInputWrapper;

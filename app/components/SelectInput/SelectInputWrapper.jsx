import rdf from '@ontologies/core';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import {
  linkType,
  topologyType,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import { defineMessages, useIntl } from 'react-intl';
import { useDebouncedCallback } from 'use-debounce';

import { entityIsLoaded } from '../../helpers/data';
import normalizedLower from '../../helpers/i18n';
import { isResource } from '../../helpers/types';
import ontola from '../../ontology/ontola';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';
import RadioGroup from '../../topologies/RadioGroup';
import { searchIri } from '../../views/SearchResult/searchHelper';
import { LoadingRow } from '../Loading';

import SelectInputField, { MAX_ITEMS, itemToString } from './SelectInputField';

const DEBOUNCE_TIMER = 500;
const DEFAULT_RADIO_ITEM_LIMIT = 5;
const MAX_RADIO_ITEMS = 20;
const MAX_SELECT_LABEL_LENGTH = 60;

const messages = defineMessages({
  noMatchingItems: {
    defaultMessage: 'No matching items',
    id: 'https://app.argu.co/i18n/forms/select/noMatchingItems',
  },
  typeToSearch: {
    defaultMessage: 'Type to start searching',
    id: 'https://app.argu.co/i18n/forms/select/typeToSearch',
  },
});

function calculateItemsToShow(inputValue, selectedItem, options, lrs) {
  const compareValue = inputValue && normalizedLower(typeof inputValue === 'string' ? inputValue : inputValue.value);

  if (inputValue && inputValue !== selectedItem && options.length > MAX_ITEMS) {
    return options
      .filter((item) => (
        normalizedLower(item.value).includes(compareValue)
          || normalizedLower(itemToString(item, lrs)).includes(compareValue)
      ));
  }

  return options;
}

function emptyText(fm, searchTemplate, inputValue) {
  if (searchTemplate) {
    if (inputValue && inputValue.length > 0) {
      return fm(messages.noMatchingItems);
    }

    return fm(messages.typeToSearch);
  }

  return fm(messages.noMatchingItems);
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

    if (searchTemplate && changes.inputValue && !changes.selectedItem) {
      const compareValue = inputValue && normalizedLower(typeof inputValue === 'string' ? inputValue : inputValue.value);
      const searchResult = (compareValue && compareValue.length > 0)
        ? searchIri(searchTemplate.value, compareValue, 1, true)
        : searchIri(searchTemplate.value, null, null, true);
      onOptionsChange(searchResult);
    }

    const itemsToShow = calculateItemsToShow(
      inputValue,
      selectedItem,
      options,
      lrs
    );

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
  if (rdf.equals(inputFieldHint, ontola.ns('element/select')) || rdf.equals(topology, formFooterTopology)) {
    return false;
  }
  if (rdf.equals(inputFieldHint, ontola.ns('element/input/radio')) || items.length <= DEFAULT_RADIO_ITEM_LIMIT) {
    return true;
  }
  if (items.length > MAX_RADIO_ITEMS) {
    return false;
  }

  const labels = items.map((item) => itemToString(item, lrs));

  return labels.some((label) => label.length > MAX_SELECT_LABEL_LENGTH);
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
  const { formatMessage } = useIntl();
  const lrs = useLRS();

  const [state, setState] = React.useState({
    itemsToShow: [],
    shouldClose: false,
  });
  React.useEffect(() => {
    setState(updateOptions(state, options, lrs));
  }, [loading, options]);
  const [debouncedCallback] = useDebouncedCallback(
    (changes) => handleStateChange(
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
  useDataInvalidation(options.filter(isResource));

  const initialSelectedItem = inputValue || initialValue;

  if (__CLIENT__ && initialSelectedItem && initialSelectedItem.termType === 'NamedNode' && !entityIsLoaded(lrs, initialSelectedItem)) {
    lrs.queueEntity(initialSelectedItem);

    return <LoadingRow />;
  }

  if (!searchTemplate && renderAsRadioGroup(topology, options, lrs, inputFieldHint)) {
    return (
      <RadioGroup
        items={options}
        loading={loading}
        name={sharedProps.name}
        required={sharedProps.required}
        value={inputValue?.value}
        onChange={(event, v) => sharedProps.onChange({ target: { value: rdf.namedNode(v) } })}
      />
    );
  }

  return (
    <div className={className}>
      <SelectInputField
        emptyText={emptyText(formatMessage, searchTemplate, state.inputValue)}
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
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    required: PropTypes.bool,
  }).isRequired,
  topology: topologyType,
};

export default SelectInputWrapper;

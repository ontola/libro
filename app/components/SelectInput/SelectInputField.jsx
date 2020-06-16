import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import Downshift from 'downshift';
import { LinkedRenderStore } from 'link-lib';
import {
  Resource,
  linkType,
  useLRS,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { entityIsLoaded } from '../../helpers/data';
import { handle } from '../../helpers/logging';
import { isResource } from '../../helpers/types';
import ontola from '../../ontology/ontola';
import Select, { selectTopology } from '../../topologies/Select';
import { Input } from '../Input';

import SelectInputList from './SelectInputList';

export const MAX_ITEMS = 5;

export const itemToString = (item, lrs) => {
  if (!item) {
    return '';
  }

  if (isResource(item)) {
    if (!entityIsLoaded(lrs, item)) {
      return 'Loading';
    }

    const itemClass = lrs.getResourceProperty(item, rdfx.type);
    const classDisplayProp = (
      itemClass && lrs.getResourceProperty(itemClass, ontola.ns('forms/inputs/select/displayProp'))
    ) || schema.name;
    let label = lrs.getResourceProperty(item, classDisplayProp);
    if (!label) {
      handle(new TypeError(`Resource ${item} has no property ${classDisplayProp}`));
      label = lrs.getResourceProperty(item, schema.name);
    }

    return label ? label.value : item.value;
  }

  return item.value || item;
};

const SelectInputField = ({
  emptyText,
  initialSelectedItem,
  items,
  loading,
  sharedProps,
  onStateChange,
}) => {
  const lrs = useLRS();

  return (
    <Downshift
      initialInputValue={itemToString(initialSelectedItem, lrs)}
      initialSelectedItem={initialSelectedItem}
      itemToString={(item) => itemToString(item, lrs)}
      {...sharedProps}
      onChange={(v) => sharedProps.onChange({ target: { value: v } })}
      onStateChange={onStateChange}
    >
      {(downshiftOpts) => {
        const {
          getInputProps,
          getMenuProps,
          openMenu,
          isOpen,
        } = downshiftOpts;

        let list = null;
        const onFocus = (e) => {
          e.target.select();
          openMenu(e);
        };

        if (isOpen) {
          list = (
            <SelectInputList
              emptyText={emptyText}
              getItemProps={downshiftOpts.getItemProps}
              highlightedIndex={downshiftOpts.highlightedIndex}
              items={items}
              loading={loading}
              maxItems={MAX_ITEMS}
              selectedItem={downshiftOpts.selectedItem}
            />
          );
        } else {
          list = (
            <React.Fragment>
              <option aria-selected="false" className="AriaHidden">Focus to show items</option>
            </React.Fragment>
          );
        }

        const renderClosed = () => {
          let inner;
          if (initialSelectedItem) {
            if (isResource(initialSelectedItem)) {
              inner = <Resource element="div" subject={initialSelectedItem} topology={selectTopology} />;
            } else {
              inner = initialSelectedItem.value;
            }
          }

          return (
            <button
              className="SelectInput--selected"
              type="button"
              onClick={openMenu}
            >
              {inner}
            </button>
          );
        };

        const renderOpen = () => {
          const inputProps = {
            ...sharedProps,
            ...getInputProps({ onFocus }),
            autoFocus: true,
          };

          return <Input {...inputProps} />;
        };

        return (
          <div>
            {isOpen ? renderOpen() : renderClosed()}
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
            <input
              className="hidden-field"
              id={sharedProps.id}
              name={sharedProps.name}
              required={sharedProps.required}
              type="text"
              value={initialSelectedItem?.value}
            />
          </div>
        );
      }}
    </Downshift>
  );
};

SelectInputField.propTypes = {
  emptyText: PropTypes.string,
  initialSelectedItem: linkType,
  items: PropTypes.arrayOf(linkType),
  loading: PropTypes.bool,
  lrs: PropTypes.instanceOf(LinkedRenderStore),
  onStateChange: PropTypes.func,
  sharedProps: PropTypes.shape({
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    required: PropTypes.bool,
  }).isRequired,
};

export default SelectInputField;

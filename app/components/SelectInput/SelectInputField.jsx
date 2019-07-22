import Downshift from 'downshift';
import { LinkedRenderStore } from 'link-lib';
import {
  linkType,
  useLRS,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../topologies/Select';
import { Input } from '../Input';
import { NS } from '../../helpers/LinkedRenderStore';
import { handle } from '../../helpers/logging';

import SelectInputList from './SelectInputList';

export const MAX_ITEMS = 5;

export const itemToString = (item, lrs) => {
  if (!item) {
    return '';
  }

  if (item.termType && (item.termType === 'NamedNode' || item.termType === 'BlankNode')) {
    const itemClass = lrs.getResourceProperty(item, NS.rdf('type'));
    const classDisplayProp = (
      itemClass && lrs.getResourceProperty(itemClass, NS.ontola('forms/inputs/select/displayProp'))
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

const SelectInputField = ({
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
      itemToString={item => itemToString(item, lrs)}
      {...sharedProps}
      onChange={v => sharedProps.onChange({ target: { value: v } })}
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

        if (isOpen) {
          list = (
            <SelectInputList
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
};

SelectInputField.propTypes = {
  initialSelectedItem: linkType,
  items: PropTypes.arrayOf(linkType),
  loading: PropTypes.bool,
  lrs: PropTypes.instanceOf(LinkedRenderStore),
  onStateChange: PropTypes.func,
  sharedProps: PropTypes.shape({
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
};

export default SelectInputField;

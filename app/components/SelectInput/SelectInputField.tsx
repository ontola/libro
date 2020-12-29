import { isTerm, SomeTerm } from '@ontologies/core';
import Downshift from 'downshift';
import {
  Resource,
} from 'link-redux';
import React, { EventHandler } from 'react';

import { isResource } from '../../helpers/types';
import Select, { selectTopology } from '../../topologies/Select';
import { Input } from '../Input';
import HiddenRequiredInput from '../Input/HiddenRequiredInput';
import { InputAutocomplete, InputMode, InputType } from '../Input/Input';

import SelectInputList from './SelectInputList';

export const MAX_ITEMS = 5;

const style = {
  maxHeight: '20em',
  position: 'absolute',
  zIndex: 10,
};

interface PropTypes {
  emptyText: string;
  initialSelectedItem?: SomeTerm;
  itemToString: (item: SomeTerm | undefined) => string;
  items: SomeTerm[];
  loading: boolean;
  name: string;
  onChange: EventHandler<any>;
  onInputValueChange: EventHandler<any>;
  required: boolean;
}

interface InputProps {
  autoFocus?: boolean;
  autoComplete?: InputAutocomplete;
  inputMode?: InputMode;
  name?: string;
  onFocus: EventHandler<any>;
  type?: InputType;
  value?: boolean | string | number;
}

const SelectInputField: React.FC<PropTypes> = ({
  emptyText,
  initialSelectedItem,
  itemToString,
  items,
  loading,
  name,
  onChange,
  onInputValueChange,
  required,
}) => {
  const handleChange = React.useCallback((v) => isTerm(v) ? onChange(v) : null, [onChange]);

  return (
    <Downshift
      id={name}
      initialSelectedItem={initialSelectedItem}
      itemToString={itemToString}
      onChange={handleChange}
      onInputValueChange={onInputValueChange}
    >
      {(downshiftOpts) => {
        const {
          getInputProps,
          getMenuProps,
          openMenu,
          isOpen,
        } = downshiftOpts;

        let list;
        const onFocus = (e: any) => {
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
              onClick={openMenu as any}
            >
              {inner}
            </button>
          );
        };

        const renderOpen = () => {
          const inputProps = getInputProps<InputProps>({
            autoFocus: true,
            name,
            onFocus,
          });

          return (
            <Input {...inputProps}/>
          );
        };

        return (
          <div>
            {isOpen ? renderOpen() : renderClosed()}
            <Select
              scrollIntoView={isOpen}
              {...getMenuProps()}
              style={style}
            >
              {list}
            </Select>
            {required
              && <HiddenRequiredInput name={name} value={initialSelectedItem?.value || ''} />}
          </div>
        );
      }}
    </Downshift>
  );
};

export default SelectInputField;

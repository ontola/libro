import Downshift from 'downshift';
import { LinkedRenderStore } from 'link-lib';
import { linkedPropType, LinkedResourceContainer, withLRS } from 'link-redux';
import React from 'react';
import VirtualList from 'react-tiny-virtual-list';
import PropTypes from 'prop-types';

import { listToArr } from '../../helpers/data';
import normalizedLower from '../../helpers/i18n';
import Select from '../../topologies/Select';
import { Input } from '../Input';
import { NS } from '../../helpers/LinkedRenderStore';

const DEFAULT_HEIGHT = 200;
const ITEM_HEIGHT = 42;
const MAX_ITEMS = 5;
const WIDTH = 300;

class SelectInput extends React.Component {
  static propTypes = {
    lrs: PropTypes.instanceOf(LinkedRenderStore),
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

  static calculateItemsToShow(state) {
    const { inputValue, options, selectedItem } = state;

    const compareValue = inputValue && normalizedLower(typeof inputValue === 'string' ? inputValue : inputValue.value);
    if (inputValue && inputValue !== selectedItem && options.length > MAX_ITEMS) {
      return options
        .filter(item => normalizedLower(item.value).includes(compareValue));
    }

    return options;
  }

  static updateOptions(state, props) {
    const nextOptions = Array.isArray(props.options)
      ? props.options
      : listToArr(props.lrs, [], props.options);

    return {
      itemsToShow: SelectInput.calculateItemsToShow({
        inputValue: state.inputValue,
        options: nextOptions,
        selectedItem: state.selectedItem,
      }),
      loading: false,
      options: nextOptions,
    };
  }

  constructor(props) {
    super(props);

    this.renderList = this.renderList.bind(this);
    this.onUserAction = this.onUserAction.bind(this);
    this.state = {
      itemsToShow: [],
      shouldClose: false,
    };
  }

  componentDidMount() {
    const { lrs, options } = this.props;

    if (!Array.isArray(options)) {
      const isUnloadedNode = options.termType === 'NamedNode' && lrs.tryEntity(options);
      if (isUnloadedNode) {
        lrs.getEntity(options).then(() => this.setState(SelectInput.updateOptions));
        return this.setState({
          loading: true,
        });
      }
    }

    const nextState = SelectInput.updateOptions(this.state, this.props);

    return this.setState(nextState);
  }

  onUserAction(changes) {
    this.setState((prevState) => {
      const { stateChangeTypes } = Downshift;
      const { options } = prevState;
      let {
        inputValue,
        itemsToShow,
        shouldClose,
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
          inputValue = this.userInputtedValue;
        } else {
          const nextVal = changes.inputValue;
          inputValue = nextVal;
          this.userInputtedValue = nextVal;
          shouldClose = false;
        }
      }

      itemsToShow = SelectInput.calculateItemsToShow({
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
    let { itemsToShow } = this.state;

    if (this.state.loading) {
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

  render() {
    const {
      initialSelectedItem,
      sharedProps,
    } = this.props;

    const itemToString = (item) => {
      if (!item) {
        return '';
      }

      if (item.termType && (item.termType === 'NamedNode' || item.termType === 'BlankNode')) {
        const itemClass = this.props.lrs.getResourceProperty(item, NS.rdf('type'));
        const classDisplayProp = this.props.lrs.getResourceProperty(
          itemClass,
          NS.ontola('forms/inputs/select/displayProp')
        );
        let label = this.props.lrs.getResourceProperty(item, classDisplayProp);
        if (!label) {
          // TODO: bugsnag
          label = this.props.lrs.getResourceProperty(item, NS.schema('name'));
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
        onStateChange={this.onUserAction}
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
                scrollIntoView
                {...getMenuProps()}
                style={{
                  maxHeight: '20em',
                  position: 'absolute',
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

export default withLRS(SelectInput);

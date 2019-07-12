import {
  linkedPropType,
  LinkedResourceContainer,
  linkType,
  useDataFetching,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { containerToArr } from '../../helpers/data';
import normalizedLower from '../../helpers/i18n';
import Select from '../../topologies/Select';
import { Input } from '../Input';
import FieldLabel from '../FieldLabel';
import LoadingInline from '../Loading';

const MAX_ITEMS = 5;

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

function handleChange(e, props) {
  const value = props.value?.slice() || [];
  if (e.target.checked) {
    value.push(e.target.id);
  } else {
    const index = value.indexOf(e.target.id);
    if (index !== -1) {
      value.splice(index, 1);
    }
  }
  props.onChange(value);
}

function updateOptions(state, props, lrs) {
  const nextOptions = Array.isArray(props.options)
    ? props.options
    : containerToArr(lrs, [], props.options);

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

function CheckboxesInput(props) {
  const {
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

  const { itemsToShow } = state;

  if (state.loading) {
    return <LoadingInline />;
  }

  if (itemsToShow.length === 0) {
    return <FormattedMessage id="https://app.argu.co/i18n/collection/empty/message" />;
  }

  const items = itemsToShow.map((item) => {
    const label = (
      <LinkedResourceContainer subject={item} />
    );

    return (
      <div className="Field__input Field__input--checkbox" key={`checkbox-${item.value}`}>
        <Input
          checked={props.value && props.value.indexOf(item.value) !== -1}
          id={item.value}
          name={sharedProps.name}
          type="checkbox"
          onChange={e => handleChange(e, props)}
        />
        <FieldLabel
          htmlFor={item.value}
          label={label}
        />
      </div>
    );
  });

  return <Select>{items}</Select>;
}

CheckboxesInput.propTypes = {
  options: optionsType.isRequired,
  sharedProps: PropTypes.shape({
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
  value: PropTypes.arrayOf(linkType),
};

export default CheckboxesInput;

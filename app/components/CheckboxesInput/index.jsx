import {
  Resource,
  linkType,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Select from '../../topologies/Select';
import { Input } from '../Input';
import FieldLabel from '../FieldLabel';
import Spinner from '../Spinner';
import { parseForStorage } from '../../hooks/usePersistence';

function handleChange(e, props) {
  const value = props.value?.slice() || [];
  const parsedValue = parseForStorage(e.target.value);
  if (e.target.checked) {
    value.push(parsedValue);
  } else {
    const index = value.map((v) => v.value).indexOf(parsedValue.value);
    if (index !== -1) {
      value.splice(index, 1);
    }
  }
  props.onChange(value);
}

function CheckboxesInput(props) {
  const {
    loading,
    options,
    sharedProps,
    value,
  } = props;

  if (loading) {
    return <Spinner loading />;
  }

  if (options.length === 0) {
    return <FormattedMessage id="https://app.argu.co/i18n/collection/empty/message" />;
  }

  const isEmpty = value?.length === 0;

  const items = options.map((item) => {
    const label = (
      <Resource subject={item} />
    );

    return (
      <div className="Field__input Field__input--checkbox" key={`checkbox-${item.value}`}>
        <Input
          checked={value && value.map((v) => v.value).indexOf(item.value) !== -1}
          id={item}
          name={sharedProps.name}
          required={isEmpty && sharedProps.required}
          type="checkbox"
          value={JSON.stringify(item)}
          onChange={(e) => handleChange(e, props)}
        />
        <FieldLabel
          htmlFor={item}
          label={label}
        />
      </div>
    );
  });

  return <Select>{items}</Select>;
}

CheckboxesInput.propTypes = {
  loading: PropTypes.bool,
  options: PropTypes.arrayOf(linkType),
  sharedProps: PropTypes.shape({
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    required: PropTypes.bool,
  }).isRequired,
  value: PropTypes.arrayOf(linkType),
};

export default CheckboxesInput;

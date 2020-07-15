import {
  Resource,
  linkType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { parseForStorage } from '../../helpers/persistence';
import Select from '../../topologies/Select';
import FieldLabel from '../FieldLabel';
import { Input } from '../Input';
import HiddenRequiredInput from '../Input/HiddenRequiredInput';
import Spinner from '../Spinner';

function handleChange(e, values, onChange) {
  const newValue = values?.slice() || [];
  const parsedValue = parseForStorage(e.target.value);
  if (e.target.checked) {
    newValue.push(parsedValue);
  } else {
    const index = values.map((v) => v.value).indexOf(parsedValue.value);
    if (index !== -1) {
      newValue.splice(index, 1);
    }
  }
  onChange(newValue);
}

function CheckboxesInput({
  loading,
  onChange,
  options,
  name,
  required,
  values,
}) {
  if (loading) {
    return <Spinner loading />;
  }

  if (options.length === 0) {
    return <FormattedMessage id="https://app.argu.co/i18n/collection/empty/message" />;
  }

  const items = options.map((item) => {
    const label = (
      <Resource subject={item} />
    );

    return (
      <div className="Field__input Field__input--checkbox" key={`checkbox-${item.value}`}>
        <Input
          checked={values && values.map((v) => v.value).indexOf(item.value) !== -1}
          id={item.value}
          name={name}
          type="checkbox"
          value={JSON.stringify(item)}
          onChange={(e) => handleChange(e, values, onChange)}
        />
        <FieldLabel
          htmlFor={item.value}
          label={label}
        />
      </div>
    );
  });

  return (
    <Select>
      {required && <HiddenRequiredInput value={values?.[0]} />}
      {items}
    </Select>
  );
}

CheckboxesInput.propTypes = {
  loading: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(linkType),
  required: PropTypes.bool,
  values: PropTypes.arrayOf(linkType),
};

export default CheckboxesInput;

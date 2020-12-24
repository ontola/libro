import {
  Resource,
  linkType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { parseForStorage } from '../../helpers/persistence';
import useFieldOptions from '../../hooks/useFieldOptions';
import { fieldShapeType } from '../../hooks/useFormField';
import Select from '../../topologies/Select';
import FieldLabel from '../FieldLabel';
import Spinner from '../Spinner';

import HiddenRequiredInput from './HiddenRequiredInput';
import Input from './Input';

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
  name,
  onChange,
  fieldShape,
  values,
}) {
  const {
    required,
  } = fieldShape;
  const {
    loading,
    options,
    renderCreateButton: CreateButton,
  } = useFieldOptions();

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
        <CreateButton />
      </div>
    );
  });

  return (
    <Select>
      {required && <HiddenRequiredInput value={values?.[0]?.value} />}
      {items}
    </Select>
  );
}

CheckboxesInput.propTypes = {
  fieldShape: fieldShapeType,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  values: PropTypes.arrayOf(linkType),
};

export default CheckboxesInput;

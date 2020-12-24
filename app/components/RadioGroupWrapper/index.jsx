import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import useFieldOptions from '../../hooks/useFieldOptions';
import { fieldShapeType } from '../../hooks/useFormField';
import RadioGroup from '../../topologies/RadioGroup';
import { LoadingRow } from '../Loading';

const RadioGroupWrapper = ({
  inputValue,
  fieldShape,
  name,
  onChange,
}) => {
  const {
    loading,
    options,
    renderCreateButton: CreateButton,
  } = useFieldOptions();

  if (loading) {
    return <LoadingRow />;
  }

  if (options.length === 0) {
    return (
      <FormattedMessage
        defaultMessage="No options available"
        id="https://app.argu.co/i18n/forms/radioGroup/noOptions"
      />
    );
  }

  return (
    <React.Fragment>
      <RadioGroup
        name={name}
        options={options}
        required={fieldShape.required}
        value={inputValue}
        onChange={onChange}
      />
      <CreateButton />
    </React.Fragment>
  );
};

RadioGroupWrapper.propTypes = {
  fieldShape: fieldShapeType,
  inputValue: linkType,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default RadioGroupWrapper;

import { Resource } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import useFieldOptions from '../../hooks/useFieldOptions';
import RadioGroup from '../../topologies/RadioGroup';
import CollectionCreateActionButton from '../Collection/CollectionCreateActionButton';
import { InputComponentProps } from '../FormField/FormInputs';
import { LoadingRow } from '../Loading';

const RadioGroupWrapper: React.FC<InputComponentProps> = ({
  inputValue,
  fieldShape,
  name,
  onChange,
}) => {
  const {
    shIn,
  } = fieldShape;
  const {
    loading,
    options,
  } = useFieldOptions(shIn);

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
      <Resource subject={shIn} onLoad={() => null}>
        <CollectionCreateActionButton />
      </Resource>
    </React.Fragment>
  );
};

export default RadioGroupWrapper;

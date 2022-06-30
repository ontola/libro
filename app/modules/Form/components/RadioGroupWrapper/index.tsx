import { Resource } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { formMessages } from '../../../../translations/messages';
import CollectionCreateButton from '../../../Collection/components/CollectionCreateButton';
import { LoadingHidden, LoadingRow } from '../../../Core/components/Loading';
import useFieldOptions from '../../hooks/useFieldOptions';
import RadioGroup from '../../topologies/RadioGroup';
import { formContext } from '../Form/FormContext';
import { formFieldContext } from '../FormField/FormFieldContext';
import { InputComponentProps } from '../FormField/FormFieldTypes';

const RadioGroupWrapper: React.FC<InputComponentProps> = ({
  inputValue,
  onChange,
}) => {
  const { theme } = React.useContext(formContext);
  const {
    fieldShape,
    onFocus,
    onBlur,
    name,
  } = React.useContext(formFieldContext);
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
      <FormattedMessage {...formMessages.radioNoOptions} />
    );
  }

  return (
    <React.Fragment>
      <RadioGroup
        name={name}
        options={options}
        required={fieldShape.required}
        theme={theme}
        value={inputValue}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
      />
      <Resource
        subject={shIn}
        onLoad={LoadingHidden}
      >
        <CollectionCreateButton />
      </Resource>
    </React.Fragment>
  );
};

export default RadioGroupWrapper;

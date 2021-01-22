import { Resource } from 'link-redux';
import React, { EventHandler } from 'react';
import { FormattedMessage } from 'react-intl';

import { parseForStorage } from '../../helpers/persistence';
import useFieldOptions from '../../hooks/useFieldOptions';
import { InputValue } from '../../hooks/useFormField';
import Select from '../../topologies/Select';
import CollectionCreateActionButton from '../Collection/CollectionCreateActionButton';
import FieldLabel from '../FieldLabel';
import { InputComponentProps } from '../FormField/FormInputs';
import Spinner from '../Spinner';

import HiddenRequiredInput from './HiddenRequiredInput';
import Input, { InputType } from './Input';

function handleChange(e: any, values: InputValue[], onChange: EventHandler<any>) {
  const newValue = values?.slice() || [];
  const parsedValues = parseForStorage(e.target.value);
  if (typeof parsedValues === 'undefined') {
    return;
  }

  const parsedValue = parsedValues[0];

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

const CheckboxesInput: React.FC<InputComponentProps> = ({
  name,
  onChange,
  fieldShape,
  values,
}) => {
  const {
    required,
    shIn,
  } = fieldShape;
  const {
    loading,
    options,
  } = useFieldOptions(shIn);

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
          type={InputType.Checkbox}
          value={JSON.stringify(item)}
          onChange={(e) => handleChange(e, values, onChange)}
        />
        <FieldLabel
          htmlFor={item.value}
          label={label}
        />
        <Resource subject={shIn} onLoad={() => null}>
          <CollectionCreateActionButton />
        </Resource>
      </div>
    );
  });

  return (
    <Select>
      {required && <HiddenRequiredInput name={name} value={values?.[0]?.value} />}
      {items}
    </Select>
  );
};

export default CheckboxesInput;

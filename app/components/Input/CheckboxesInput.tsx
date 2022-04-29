import { Checkbox, FormControlLabel } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { Resource } from 'link-redux';
import React, { EventHandler } from 'react';
import { FormattedMessage } from 'react-intl';

import { parseForStorage } from '../../helpers/persistence';
import useFieldOptions from '../../hooks/useFieldOptions';
import { LibroTheme } from '../../themes/themes';
import Select from '../../topologies/Select';
import CollectionCreateButton from '../Collection/CollectionCreateButton';
import { FormTheme, formContext } from '../Form/FormContext';
import { formFieldContext } from '../FormField/FormFieldContext';
import { InputValue } from '../FormField/FormFieldTypes';
import {
  fieldInputCID,
  fieldInputCheckboxCID,
  useFormStyles,
} from '../FormField/UseFormStyles';
import { LoadingHidden } from '../Loading';
import Spinner from '../Spinner';

import { useCheckboxStyles } from './CheckboxInput';
import HiddenRequiredInput from './HiddenRequiredInput';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  wrapperFlow: {
    [theme.breakpoints.up('md')]: {
      maxHeight: '70vh',
    },
    marginLeft: '-1rem',
    maxHeight: '50vh',
    overflow: 'auto',
    paddingLeft: '1rem',
  },
}));

function handleChange(e: any, values: InputValue[], onChange: EventHandler<any>) {
  const newValue = values?.slice()?.filter((term) => term.value) || [];
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

const CheckboxesInput: React.FC = () => {
  const { theme } = React.useContext(formContext);
  const {
    name,
    onBlur,
    onChange,
    onFocus,
    fieldShape,
    values,
  } = React.useContext(formFieldContext);
  const checkboxClasses = useCheckboxStyles();
  const classes = useStyles();
  const formClasses = useFormStyles();

  const checkBoxClassName = clsx({
    [formClasses.fieldInput]: true,
    [fieldInputCID]: true,
    [fieldInputCheckboxCID]: true,
    [checkboxClasses.checkBoxWrapper]: true,
    [checkboxClasses.flowCheckBox]: theme === FormTheme.Flow,
  });

  const wrapperClassName = clsx({
    [classes.wrapperFlow]: theme === FormTheme.Flow,
  });

  const {
    required,
    shIn,
  } = fieldShape;

  const {
    loading,
    options,
  } = useFieldOptions(shIn);

  if (loading) {
    return <Spinner />;
  }

  if (options.length === 0) {
    return (
      <FormattedMessage
        defaultMessage="No items yet"
        id="https://app.argu.co/i18n/collection/empty/message"
      />
    );
  }

  const items = options.map((item) => {
    const label = (
      <Resource subject={item} />
    );

    return (
      <div
        className={checkBoxClassName}
        key={`checkbox-${item.value}`}
      >
        <FormControlLabel
          checked={values?.some((v) => v.value === item.value)}
          control={(
            <Checkbox
              color="primary"
              id={item.value}
              value={JSON.stringify(item)}
            />
          )}
          label={label}
          name={name}
          value={JSON.stringify(item)}
          onBlur={onBlur}
          onChange={(e) => handleChange(e, values, onChange)}
          onFocus={onFocus}
        />
      </div>
    );
  });

  return (
    <Select>
      {required && (
        <HiddenRequiredInput
          name={name}
          value={values?.[0]?.value}
        />
      )}
      <div className={wrapperClassName}>
        {items}
      </div>
      <Resource
        subject={shIn}
        onLoad={LoadingHidden}
      >
        <CollectionCreateButton />
      </Resource>
    </Select>
  );
};

export default CheckboxesInput;

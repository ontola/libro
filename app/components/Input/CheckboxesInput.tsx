import { FormControlLabel } from '@material-ui/core';
import CheckBox from '@material-ui/core/Checkbox';
import makeStyles from '@material-ui/styles/makeStyles';
import clsx from 'clsx';
import { Resource } from 'link-redux';
import React, { EventHandler } from 'react';
import { FormattedMessage } from 'react-intl';

import { parseForStorage } from '../../helpers/persistence';
import useFieldOptions from '../../hooks/useFieldOptions';
import { InputValue } from '../../hooks/useFormField';
import { LibroTheme } from '../../themes/themes';
import Select from '../../topologies/Select';
import CollectionCreateActionButton from '../Collection/CollectionCreateActionButton';
import { FormContext, FormTheme } from '../Form/Form';
import { FormFieldContext } from '../FormField/FormField';
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
  const { theme } = React.useContext(FormContext);
  const {
    name,
    onChange,
    fieldShape,
    values,
  } = React.useContext(FormFieldContext);
  const checkboxClasses = useCheckboxStyles();
  const classes = useStyles();
  const checkBoxClassName = clsx({
    'Field__input': true,
    'Field__input--checkbox': true,
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
    return <Spinner loading />;
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
            <CheckBox
              color="primary"
              id={item.value}
              value={JSON.stringify(item)}
            />
          )}
          label={label}
          name={name}
          value={JSON.stringify(item)}
          onChange={(e) => handleChange(e, values, onChange)}
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
        onLoad={() => null}
      >
        <CollectionCreateActionButton />
      </Resource>
    </Select>
  );
};

export default CheckboxesInput;

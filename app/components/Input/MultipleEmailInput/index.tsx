import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/styles';
import rdf from '@ontologies/core';
import React from 'react';
import { useIntl } from 'react-intl';

import { formMessages } from '../../../translations/messages';
import { formFieldContext } from '../../FormField/FormFieldContext';
import FormFieldHelper from '../../FormField/FormFieldHelper';
import { FormFieldError } from '../../FormField/FormFieldTypes';
import HiddenRequiredInput from '../HiddenRequiredInput';

import EmailOption from './EmailOption';

const useOverrideStyle = makeStyles({
  inputFocused: {
    border: 'none',
  },
  inputRoot: {
    '& textarea:first-of-type': {
      minWidth: 'min(100%, 30ch) !important',
    },
  },
  tag: {
    maxWidth: 'min(80vw, 60ch)',
  },
});

const filterUnique = (list: string[]) => Array.from(new Set(list));

export const MultipleEmailInput = (): JSX.Element => {
  const intl = useIntl();
  const {
    autofocus,
    fieldShape,
    inputErrors,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    values,
  } = React.useContext(formFieldContext);
  const overrideClasses = useOverrideStyle();

  const [textFieldValue, setTextFieldValue] = React.useState<string>('');
  const renderedErrors = React.useMemo<FormFieldError[]>(() => {
    const generalErrors = inputErrors.filter((error) => error.index === undefined);

    if (inputErrors.length > generalErrors.length) {
      generalErrors.push({ error: intl.formatMessage(formMessages.invalidValues) });
    }

    return generalErrors;
  }, [inputErrors]);
  const emails = React.useMemo(() => (
    values.map((value) => value.value).filter(Boolean)
  ), [values]);

  const updateValues = React.useCallback((newValues: string[]) => {
    onChange(filterUnique(newValues).map((v) => rdf.literal(v)));
  }, [onChange]);
  const handleChange = React.useCallback((e: React.ChangeEvent<unknown>, chips: string[]) => {
    e.preventDefault();

    updateValues(chips);
  }, [updateValues]);
  const handleTextFieldChange = React.useCallback((_: React.ChangeEvent<unknown>, newInputValue: string) => {
    const options = newInputValue.split(/[\s,;]+/);

    if (options.length > 1) {
      updateValues((emails.concat(options.map((x: string) => x.trim()).filter(Boolean))));
    } else {
      setTextFieldValue(newInputValue);
    }
  }, [updateValues, emails]);

  return (
    <React.Fragment>
      <Autocomplete
        autoSelect
        freeSolo
        multiple
        classes={overrideClasses}
        inputValue={textFieldValue}
        limitTags={10}
        open={false}
        options={['']}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            multiline
            InputProps={{
              ...params.InputProps,
              type: 'email',
            }}
            autoFocus={autofocus}
            error={inputErrors.length > 0}
            margin="none"
            name={name}
            placeholder={emails.length > 0 ? '' : placeholder}
            variant="outlined"
          />
        )}
        renderTags={(tags: string[], getTagProps) => (
          tags.map((tag, index) => (
            <EmailOption
              getTagProps={getTagProps}
              index={index}
              inputErrors={inputErrors}
              key={tag}
              tag={tag}
            />
          ),
          )
        )}
        value={emails}
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={onFocus}
        onInputChange={handleTextFieldChange}
      />
      {fieldShape.required && (
        <HiddenRequiredInput
          name={name}
          value={values[0]?.value}
        />
      )}
      <FormFieldHelper error={renderedErrors[0]} />
    </React.Fragment>
  );
};

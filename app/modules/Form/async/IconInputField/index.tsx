import {
  Autocomplete,
  AutocompleteRenderInputParams,
  InputAdornment,
  TextField,
} from '@mui/material';
import { NamedNode, isNamedNode } from '@ontologies/core';
import clsx from 'clsx';
import React, { SyntheticEvent } from 'react';
import FontAwesome from 'react-fontawesome';

import { fontAwesomeIRI, normalizeFontAwesomeIRI } from '../../../Common/lib/iris';
import { FormTheme, formContext } from '../../components/Form/FormContext';
import { formFieldContext } from '../../components/FormField/FormFieldContext';
import { InputComponentProps, InputValue } from '../../components/FormField/FormFieldTypes';
import {
  fieldInputCID,
  fieldInputSelectCID,
  useFormStyles,
} from '../../components/FormField/UseFormStyles';
import HiddenRequiredInput from '../../components/Input/HiddenRequiredInput';
import SelectedValue from '../../topologies/SelectedValue';
import useSelectStyles from '../SelectInput/useSelectStyles';

import fontAwesomeIcons from './helpers/fontAwesomeIcons';

const options = fontAwesomeIcons.sort().map(fontAwesomeIRI);

const renderOption = (props: unknown, option: NamedNode) => {
  const icon = normalizeFontAwesomeIRI(option);

  return (
    <li {...props}>
      <div>
        <FontAwesome name={icon} />
        {' '}
        {icon}
      </div>
    </li>
  );
};

const IconInputField: React.FC<InputComponentProps> = ({
  onChange,
  inputValue,
}) => {
  const { theme } = React.useContext(formContext);
  const {
    fieldShape,
    name,
  } = React.useContext(formFieldContext);
  const classes = useSelectStyles();
  const formClasses = useFormStyles();
  const handleChange = React.useCallback<(e: SyntheticEvent<Element, Event>, v: InputValue | null) => void>((e, v) => {
    e.preventDefault();

    if (v) {
      onChange(v);
    }
  }, [onChange]);
  const renderInput = React.useCallback((params: AutocompleteRenderInputParams) => {
    const selectedIcon = isNamedNode(inputValue) ? normalizeFontAwesomeIRI(inputValue) : null;
    const inputBaseClassName = clsx({
      [classes.inputBaseFlow]: theme === FormTheme.Flow,
    });

    const inputProps = {
      ...params,
      InputProps: {
        ...params.InputProps,
        classes: { root: inputBaseClassName },
        startAdornment: selectedIcon ? (
          <SelectedValue>
            <InputAdornment
              disablePointerEvents
              position="start"
            >
              <FontAwesome name={selectedIcon} />
            </InputAdornment>
          </SelectedValue>
        ) : null,
      },
    };

    return (
      <TextField
        {...inputProps}
        className={classes.input}
        variant="outlined"
      />
    );
  }, [inputValue]);

  const className = clsx(
    classes.wrapper,
    formClasses.fieldInput,
    fieldInputSelectCID,
    fieldInputCID,
  );

  return (
    <React.Fragment>
      <div className={className}>
        <Autocomplete
          disableClearable={fieldShape.required}
          getOptionLabel={normalizeFontAwesomeIRI}
          id={name}
          options={options}
          renderInput={renderInput}
          renderOption={renderOption}
          value={inputValue?.value}
          onChange={handleChange}
        />
      </div>
      {fieldShape.required && (
        <HiddenRequiredInput
          name={name}
          value={inputValue?.value}
        />
      )}
    </React.Fragment>
  );
};

export default IconInputField;

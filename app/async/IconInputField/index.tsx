import { InputAdornment, TextField } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import rdf, { NamedNode, isNamedNode } from '@ontologies/core';
import clsx from 'clsx';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { FormContext, FormTheme } from '../../components/Form/Form';
import {
  FormFieldContext,
  fieldInputCID,
  fieldInputSelectCID, 
} from '../../components/FormField/FormField';
import { InputComponentProps } from '../../components/FormField/InputComponentProps';
import HiddenRequiredInput from '../../components/Input/HiddenRequiredInput';
import { FABase, normalizeFontAwesomeIRI } from '../../helpers/iris';
import SelectedValue from '../../topologies/SelectedValue';
import useSelectStyles from '../SelectInput/useSelectStyles';

import fontAwesomeIcons from './helpers/fontAwesomeIcons';

const options = fontAwesomeIcons.sort().map((icon) => rdf.namedNode(`${FABase}${icon}`));

const renderOption = (option: NamedNode) => {
  const icon = normalizeFontAwesomeIRI(option);

  return (
    <div>
      <FontAwesome name={icon} />
      {' '}
      {icon}
    </div>
  );
};

const IconInputField: React.FC<InputComponentProps> = ({
  onChange,
  inputValue,
}) => {
  const { theme } = React.useContext(FormContext);
  const {
    fieldShape,
    name,
  } = React.useContext(FormFieldContext);
  const classes = useSelectStyles();
  const handleChange = React.useCallback((e, v) => {
    e.preventDefault();

    onChange(v);
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
    [classes.wrapper],
    'Field__input',
    [fieldInputSelectCID],
    [fieldInputCID],
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

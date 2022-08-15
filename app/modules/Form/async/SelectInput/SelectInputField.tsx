import {
  Autocomplete,
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  InputAdornment,
  TextField,
} from '@mui/material';
import {
  SomeTerm,
  isLiteral,
  isNamedNode,
  isSomeTerm,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  Property,
  Resource,
  useBooleans,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React, { SyntheticEvent } from 'react';
import { useIntl } from 'react-intl';

import CollectionCreateButton from '../../../Collection/components/CollectionCreateButton';
import { isResource } from '../../../Kernel/lib/typeCheckers';
import { LoadingHidden, LoadingRow } from '../../../Common/components/Loading';
import { entityIsLoaded } from '../../../Kernel/lib/data';
import ontola from '../../../Kernel/ontology/ontola';
import { FormTheme, formContext } from '../../components/Form/FormContext';
import { formFieldContext } from '../../components/FormField/FormFieldContext';
import { InputValue } from '../../components/FormField/FormFieldTypes';
import {
  fieldInputCID,
  fieldInputSelectCID,
  useFormStyles,
} from '../../components/FormField/UseFormStyles';
import HiddenRequiredInput from '../../components/Input/HiddenRequiredInput';
import useAsyncFieldOptions from '../../hooks/useAsyncFieldOptions';
import form from '../../ontology/form';
import { selectTopology } from '../../topologies';
import SelectedValue from '../../topologies/SelectedValue';

import FullWidthPopper from './FullWidthPopper';
import { formatEmptyMessage } from './lib/emptyMessage';
import { filterOptions } from './lib/filterOptions';
import { sortByGroup } from './lib/sortByGroup';
import { useItemToString } from './lib/useItemToString';
import SelectList from './SelectList';
import useSelectStyles from './useSelectStyles';
import VirtualizedSelect from './VirtualizedSelect';

const VIRTUALIZATION_THRESHOLD = 10;

const getRenderOption = (className: string) => (props: unknown, option: SomeTerm) => {
  if (isLiteral(option.termType)) {
    return (
      <li
        {...props}
        key={option.value}
      >
        <option
          className={className}
          value={option.value}
        >
          {option.value}
        </option>
      </li>
    );
  }

  return (
    <li
      {...props}
      key={option.value}
    >
      <Resource
        element="div"
        subject={option}
      />
    </li>
  );
};

const SelectInputField: React.FC = () => {
  const { theme } = React.useContext(formContext);
  const {
    fieldShape,
    name,
    onChange,
    values,
  } = React.useContext(formFieldContext);
  const multiple = fieldShape.maxCount && fieldShape.maxCount > 1;

  const { formatMessage } = useIntl();
  const lrs = useLRS();
  const classes = useSelectStyles();
  const formClasses = useFormStyles();
  const [open, setOpen] = React.useState(false);
  const itemToString = useItemToString();
  const [inputValue, setInputValue] = React.useState(multiple ? '' : itemToString(values[0]?.value));
  const [grouped] = useBooleans(form.groupedOptions);
  const { loading, options, searchable } = useAsyncFieldOptions(fieldShape.shIn, inputValue);

  const sortedOptions = React.useMemo(() => (
    grouped ? options.sort(sortByGroup(lrs)) : options
  ), [options]);

  const createButton = React.useMemo(() => fieldShape.shIn && (
    <Resource
      subject={fieldShape.shIn}
      onLoad={LoadingHidden}
    >
      <CollectionCreateButton />
    </Resource>
  ), [fieldShape.shIn]);
  const handleInputValueChange = React.useCallback<(event: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => void>(
    (_, newValue) => {
      setInputValue(newValue);
    }, [setInputValue]);

  useDataInvalidation(options.filter(isResource));
  const groupBy = React.useCallback((option: SomeTerm) => {
    const group = isNamedNode(option) ? lrs.getResourceProperty(option, ontola.groupBy) : undefined;
    const groupName = isNamedNode(group) ? lrs.getResourceProperty(group, schema.name) : undefined;

    return groupName?.value ?? '';
  }, []);

  const valueProps = React.useMemo(() => {
    const filteredValues = values.filter(isSomeTerm).filter((term) => term.value.length > 0);

    return multiple ? {
      filterSelectedOptions: true,
      multiple: true,
      value: filteredValues,
    } : {
      multiple: false,
      value: filteredValues[0] ?? null,
    };
  }, [multiple, values]);

  const handleChange = React.useCallback<(e: SyntheticEvent<Element, Event>, v: InputValue | InputValue[] | null) => void>((e, v) => {
    e.preventDefault();
    setInputValue('');

    if (multiple) {
      onChange((v as InputValue[]).filter(isSomeTerm));
    } else {
      onChange(isSomeTerm(v) ? [v] : []);
    }
  }, [multiple, onChange]);

  const renderInput = React.useCallback((params: AutocompleteRenderInputParams) => {
    const inputBaseClassName = clsx({
      [classes.inputBaseFlow]: theme === FormTheme.Flow,
    });

    const inputProps = {
      ...params,
      InputProps: {
        ...params.InputProps,
        classes: { root: inputBaseClassName },
        endAdornment: (
          <div className="MuiAutocomplete-endAdornment">
            {(params.InputProps.endAdornment as any)?.props?.children}
            {createButton}
          </div>
        ),
      },
    };

    if (isNamedNode(valueProps.value)) {
      inputProps.InputProps.startAdornment = (
        <SelectedValue>
          <InputAdornment
            disablePointerEvents
            position="start"
          >
            <Resource subject={valueProps.value}>
              <Property
                label={schema.image}
                topology={selectTopology}
              />
            </Resource>
          </InputAdornment>
        </SelectedValue>
      );
    }

    return (
      <TextField
        {...inputProps}
        className={classes.input}
        variant="outlined"
      />
    );
  }, [createButton, multiple, valueProps.value]);
  React.useEffect(() => {
    if (open) {
      handleInputValueChange(null as unknown as SyntheticEvent, '', 'reset');
    }
  }, [open]);

  const freshValues = values.filter((value) => isNamedNode(value) && !entityIsLoaded(lrs, value));

  if (__CLIENT__ && freshValues.length > 0) {
    freshValues.filter(isNamedNode).forEach((value) => {
      lrs.queueEntity(value);
    });

    return <LoadingRow />;
  }

  const virtualized = !grouped && options.length > VIRTUALIZATION_THRESHOLD;
  const className = clsx({
    [classes.flow]: theme === FormTheme.Flow,
    [classes.wrapper]: true,
    [formClasses.fieldInput]: true,
    [fieldInputCID]: true,
    [fieldInputSelectCID]: true,
  });

  return (
    <React.Fragment>
      <div className={className}>
        <Autocomplete
          disableListWrap
          openOnFocus
          ListboxComponent={virtualized ? VirtualizedSelect : SelectList}
          PopperComponent={virtualized ? undefined : FullWidthPopper}
          disableClearable={fieldShape.required}
          disabled={!fieldShape.shIn}
          filterOptions={searchable ? (opts: SomeTerm[]) => opts : filterOptions}
          getOptionLabel={itemToString}
          groupBy={grouped ? groupBy : undefined}
          id={name}
          inputValue={inputValue}
          loading={loading}
          noOptionsText={formatEmptyMessage(formatMessage, searchable, inputValue)}
          options={sortedOptions}
          renderInput={renderInput}
          renderOption={getRenderOption(formClasses.fieldListElement)}
          onChange={handleChange}
          onClose={() => {
            setOpen(false);
          }}
          onInputChange={handleInputValueChange}
          onOpen={() => {
            setOpen(true);
          }}
          {...valueProps}
        />
      </div>
      {fieldShape.required && (
        <HiddenRequiredInput
          name={name}
          value={values[0]?.value}
        />
      )}
    </React.Fragment>
  );
};

export default SelectInputField;

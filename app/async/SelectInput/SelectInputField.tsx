import {
  InputAdornment,
  Popper,
  TextField,
} from '@material-ui/core';
import { PopperProps } from '@material-ui/core/Popper/Popper';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { CSSProperties } from '@material-ui/styles';
import {
  SomeTerm,
  isNamedNode,
  isSomeTerm,
  isTerm,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React, { HTMLAttributes } from 'react';
import { useIntl } from 'react-intl';
import { useDebouncedCallback } from 'use-debounce';

import CollectionCreateActionButton from '../../components/Collection/CollectionCreateActionButton';
import { InputComponentProps } from '../../components/FormField/InputComponentProps';
import HiddenRequiredInput from '../../components/Input/HiddenRequiredInput';
import { LoadingRow } from '../../components/Loading';
import { entityIsLoaded } from '../../helpers/data';
import { isResource } from '../../helpers/types';
import useAsyncFieldOptions from '../../hooks/useAsyncFieldOptions';
import Select, { selectTopology } from '../../topologies/Select';
import SelectedValue from '../../topologies/SelectedValue';

import {
  emptyText,
  filterOptions,
  renderOption,
  useItemToString,
} from './helpers';
import VirtualizedSelect from './VirtualizedSelect';

const DEBOUNCE_TIMEOUT = 500;
const VIRTUALIZATION_THRESHOLD = 10;

const popperStyles: CSSProperties = {
  width: 'fit-content',
};

const inputStyles: CSSProperties = {
  flexWrap: 'nowrap',
};

const FullWidthPopper = (props: PopperProps) => (
  <Popper
    {...props}
    placement="bottom-start"
    style={popperStyles}
  />
);

const SelectList = React.forwardRef<any, HTMLAttributes<HTMLElement>>(
  ({ children, ...otherProps }, ref) => (
    <Select {...otherProps} innerRef={ref}>
      {children}
    </Select>
  ),
);

const SelectInputField: React.FC<InputComponentProps> = ({
  fieldShape,
  name,
  onChange,
  values,
}) => {
  const multiple = fieldShape.maxCount > 1;
  const { formatMessage } = useIntl();
  const lrs = useLRS();
  const [open, setOpen] = React.useState(false);
  const itemToString = useItemToString();
  const [currentValue, setCurrentValue] = React.useState('');
  const { loading, options, searchable } = useAsyncFieldOptions(open, fieldShape.shIn, currentValue);
  const createButton = React.useMemo(() => (
    <Resource subject={fieldShape.shIn} onLoad={() => null}>
      <CollectionCreateActionButton />
    </Resource>
  ), [fieldShape.shIn]);
  const [handleInputValueChange] = useDebouncedCallback(
    (_, newValue) => {
      setCurrentValue(newValue);
    },
    searchable ? DEBOUNCE_TIMEOUT : 0,
    { leading: true }
    ,
  );
  useDataInvalidation(options.filter(isResource));

  const valueProps = React.useMemo(() => {
    const filteredValues = values.filter(isSomeTerm).filter((term) => term.value.length > 0);

    return multiple ? {
      filterSelectedOptions: true,
      multiple: true,
      value: filteredValues,
    } : {
      multiple: false,
      value: filteredValues[0],
    };
  }, [multiple, values]);
  const handleChange = React.useCallback((e, v) => {
    e.preventDefault();
    setCurrentValue('');

    if (multiple) {
      onChange(v.filter(isSomeTerm));
    } else {
      onChange(isTerm(v) ? [v] : []);
    }
  }, [multiple, onChange]);
  const renderInput = React.useCallback((params: AutocompleteRenderInputParams) => {
    const inputProps = {
      ...params,
      InputProps: {
        ...params.InputProps,
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
          <InputAdornment disablePointerEvents position="start">
            <Resource subject={valueProps.value}>
              <Property label={schema.image} topology={selectTopology}/>
            </Resource>
          </InputAdornment>
        </SelectedValue>
      );
    }

    return (
      <TextField
        {...inputProps}
        style={inputStyles}
        variant="outlined"
      />
    );
  }, [createButton, multiple, valueProps.value]);

  const freshValues = values.filter((value) => isNamedNode(value) && !entityIsLoaded(lrs, value));
  if (__CLIENT__ && freshValues.length > 0) {
    freshValues.filter(isNamedNode).forEach((value) => {
      lrs.queueEntity(value);
    });

    return <LoadingRow />;
  }
  const virtualized = options.length > VIRTUALIZATION_THRESHOLD;

  return (
    <React.Fragment>
      <div className="Field__input Field__input--select">
        <Autocomplete
          disableListWrap
          openOnFocus
          ListboxComponent={virtualized ? VirtualizedSelect : SelectList}
          PopperComponent={virtualized ? undefined : FullWidthPopper}
          disableClearable={fieldShape.required}
          filterOptions={searchable ? (opts: SomeTerm[]) => opts : filterOptions}
          getOptionLabel={itemToString}
          id={name}
          loading={loading}
          noOptionsText={emptyText(formatMessage, searchable, currentValue)}
          open={open}
          options={options}
          renderInput={renderInput}
          renderOption={renderOption}
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

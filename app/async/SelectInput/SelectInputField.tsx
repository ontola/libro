import { InputAdornment, Popper, TextField } from '@material-ui/core';
import { PopperProps } from '@material-ui/core/Popper/Popper';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { isNamedNode, isSomeTerm, isTerm, SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  LinkReduxLRSType,
  Property,
  Resource,
  ReturnType,
  useDataInvalidation,
  useLRS,
  useProperty,
} from 'link-redux';
import React, { HTMLAttributes } from 'react';
import { useIntl } from 'react-intl';
import { useDebouncedCallback } from 'use-debounce';

import CollectionCreateActionButton from '../../components/Collection/CollectionCreateActionButton';
import { InputComponentProps } from '../../components/FormField/FormInputs';
import HiddenRequiredInput from '../../components/Input/HiddenRequiredInput';
import { LoadingRow } from '../../components/Loading';
import { entityIsLoaded } from '../../helpers/data';
import { isResource } from '../../helpers/types';
import useAsyncFieldOptions from '../../hooks/useAsyncFieldOptions';
import form from '../../ontology/form';
import ontola from '../../ontology/ontola';
import Select, { selectTopology } from '../../topologies/Select';
import SelectedValue from '../../topologies/SelectedValue';

import { emptyText, filterOptions, renderOption, useItemToString } from './helpers';
import VirtualizedSelect from './VirtualizedSelect';

const DEBOUNCE_TIMER = 500;

const popperStyles = {
  width: 'fit-content',
};

const FullWidthPopper = (props: PopperProps) => (
  <Popper {...props} style={popperStyles} placement="bottom-start" />
);

const sortByGroup = (lrs: LinkReduxLRSType) => (a: SomeTerm, b: SomeTerm) => {
  const groupA = isNamedNode(a) ? lrs.getResourceProperty(a, ontola.groupBy)?.value : undefined;
  const groupB = isNamedNode(b) ? lrs.getResourceProperty(b, ontola.groupBy)?.value : undefined;

  if (!groupA || groupB && groupA < groupB) {
    return -1;
  }
  if (!groupB || groupA > groupB) {
    return 1;
  }

  if (a.value === groupA) {
    return -1;
  }

  if (b.value === groupB) {
    return 1;
  }

  return 0;
};

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
  const grouped = useProperty(form.groupedOptions, { returnType: ReturnType.Literal });
  const { formatMessage } = useIntl();
  const lrs = useLRS();
  const [open, setOpen] = React.useState(false);
  const itemToString = useItemToString();
  const [currentValue, setCurrentValue] = React.useState('');
  const { loading, options, searchable } = useAsyncFieldOptions(open, fieldShape.shIn, currentValue);
  const sortedOptions = React.useMemo(() => (
    grouped ? options.sort(sortByGroup(lrs)) : options
  ), [options]);
  const createButton = React.useMemo(() => fieldShape.shIn && (
    <Resource subject={fieldShape.shIn} onLoad={() => null}>
      <CollectionCreateActionButton />
    </Resource>
  ), [fieldShape.shIn]);
  const [handleInputValueChange] = useDebouncedCallback(
    (_, newValue) => {
      setCurrentValue(newValue);
    },
    searchable ? DEBOUNCE_TIMER : 0,
    { leading: true }
    ,
  );
  useDataInvalidation(options.filter(isResource));
  const groupBy = React.useCallback((option: SomeTerm) => {
    const group = isNamedNode(option) ? lrs.getResourceProperty(option, ontola.groupBy) : undefined;
    const groupName = isNamedNode(group) ? lrs.getResourceProperty(group, schema.name) : undefined;

    return groupName?.value || '';
  }, []);
  const valueProps = React.useMemo(() => {
    const filteredValues = values.filter(isSomeTerm).filter((term) => term.value.length > 0);

    return (
      multiple ? {
        filterSelectedOptions: true,
        multiple: true,
        value: filteredValues,
      } : {
        multiple: false,
        value: filteredValues[0],
      }
    );
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
        style={{
          flexWrap: 'nowrap',
        }}
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
  const virtualized = !grouped && options.length > 10;

  return (
    <React.Fragment>
      <div className="Field__input Field__input--select">
        <Autocomplete
          disableListWrap
          openOnFocus
          disableClearable={fieldShape.required}
          disabled={!fieldShape.shIn}
          getOptionLabel={itemToString}
          filterOptions={searchable ? (opts: SomeTerm[]) => opts : filterOptions}
          groupBy={grouped ? groupBy : undefined}
          id={name}
          ListboxComponent={virtualized ? VirtualizedSelect : SelectList}
          loading={loading}
          noOptionsText={emptyText(formatMessage, searchable, currentValue)}
          onInputChange={handleInputValueChange}
          options={sortedOptions}
          PopperComponent={virtualized ? undefined : FullWidthPopper}
          renderInput={renderInput}
          renderOption={renderOption}
          onChange={handleChange}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          {...valueProps}
        />
      </div>
      {fieldShape.required && <HiddenRequiredInput name={name} value={values[0]?.value}/>}
    </React.Fragment>
  );
};

export default SelectInputField;

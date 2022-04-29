import {
  Autocomplete,
  AutocompleteRenderOptionState,
  TextField,
  createFilterOptions,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SomeNode } from 'link-lib';
import { useLRS } from 'link-redux';
import React, { ChangeEvent } from 'react';
import FontAwesome from 'react-fontawesome';
import { useIntl } from 'react-intl';

import { useIRITemplate } from '../../hooks/useIRITemplate';
import { LibroTheme } from '../../themes/themes';
import { collectionMessages } from '../../translations/messages';
import { useCollectionOptions } from '../Collection/CollectionContext';

import { filteredCollectionIRI } from './lib/filteredCollectionIRI';
import { filterToLabel } from './lib/filterToLabel';
import { FilterValue } from './lib/FilterValue';

export interface FilterComboInputProps {
  activeValues: FilterValue[];
  autoFocus: boolean;
  filterValues: FilterValue[];
  hiddenActiveValues: FilterValue[];
  partOf: SomeNode;
  shown: boolean;
  transitionTime: number;
}

const OPTION_GAP = 3;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  option: {
    alignItems: 'center',
    display: 'flex',
    gap: theme.spacing(OPTION_GAP),
  },
}));

const useStyleOverrides = makeStyles<LibroTheme>((theme) => ({
  groupLabel: {
    color: theme.palette.primary.main,
  },
}));

const childProps = { color: 'primary' };

export const FilterComboInput = ({
  activeValues,
  autoFocus,
  filterValues,
  hiddenActiveValues,
  partOf,
  shown,
  transitionTime,
}: FilterComboInputProps): JSX.Element => {
  const lrs = useLRS();
  const classes = useStyles();
  const overrides = useStyleOverrides();
  const intl = useIntl();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const iriTemplate = useIRITemplate(partOf);
  const { setCollectionResource } = useCollectionOptions();

  const getOptionLabel = React.useCallback(
    (option: FilterValue) => `${filterToLabel(lrs, intl, option.key)}: ${filterToLabel(lrs, intl, option.value)}`,
    [lrs, intl],
  );
  const renderOption = React.useCallback(
    (_: unknown, option: FilterValue, state: AutocompleteRenderOptionState) => (
      <span className={classes.option}>
        <FontAwesome name={state.selected ? 'check-square-o' : 'square-o'} />
        <span>
          {filterToLabel(lrs, intl, option.value)}
        </span>
      </span>
    ),
    [lrs, intl, classes],
  );
  const renderInput = React.useCallback((params) => (
    <TextField
      {...params}
      inputRef={inputRef}
      margin="normal"
      placeholder={intl.formatMessage(collectionMessages.filter)}
      variant="outlined"
    />
  ), [inputRef, intl]);
  const groupBy = React.useCallback(
    (option) => filterToLabel(lrs, intl, option.key) ?? '',
    [lrs, intl, filterToLabel],
  );
  const handleChange = React.useCallback((_: ChangeEvent<unknown>, value: FilterValue[]) => {
    const filteredIRI = filteredCollectionIRI(lrs, value.concat(hiddenActiveValues), iriTemplate);

    setCollectionResource(filteredIRI);
  }, [lrs, iriTemplate]);

  const acFilterOptions = React.useMemo(
    () => createFilterOptions({
      stringify: getOptionLabel,
    }),
    [getOptionLabel],
  );

  React.useEffect(() => {
    if (shown && autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, transitionTime);
    }
  }, [shown, autoFocus]);

  return (
    <Autocomplete
      autoComplete
      autoHighlight
      multiple
      openOnFocus
      ChipProps={childProps}
      classes={overrides}
      filterOptions={acFilterOptions}
      getOptionLabel={getOptionLabel}
      groupBy={groupBy}
      options={filterValues}
      renderInput={renderInput}
      renderOption={renderOption}
      value={activeValues}
      onChange={handleChange}
    />
  );
};

import TextField from '@material-ui/core/TextField';
import {
  Autocomplete,
  AutocompleteRenderOptionState,
  createFilterOptions,
} from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import rdfcore, {
  Node,
  SomeTerm,
} from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { LinkReduxLRSType, useLRS } from 'link-redux';
import React, { ChangeEvent } from 'react';
import FontAwesome from 'react-fontawesome';
import { useIntl } from 'react-intl';

import { arraysEqual } from '../../helpers/data';
import { useIRITemplate } from '../../hooks/useIRITemplate';
import useMultipleFieldOptions from '../../hooks/useMultipleFieldOptions';
import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import { collectionMessages } from '../../translations/messages';
import { useCollectionOptions } from '../Collection/CollectionProvider';

import { useToLabel } from './lib/useToLabel';

export interface FilterComboInputProps {
  autoFocus: boolean;
  filters: SomeTerm[];
  currentFilters: SomeTerm[];
  partOf: SomeNode;
  shown: boolean;
  transitionTime: number;
}

interface FilterValue {
  key: SomeTerm;
  value: SomeTerm;
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

const getFilterValues = (lrs: LinkReduxLRSType, filter: SomeTerm) => lrs.dig(filter as Node, [ontola.filterOptions, ontola.filterValue]);

const createFilterParam = (lrs: LinkReduxLRSType, filter: FilterValue) => {
  const filterKey = lrs.getResourceProperty(filter.key as SomeNode, ontola.filterKey);
  const param = `${encodeURIComponent(filterKey?.value ?? '')}=${encodeURIComponent(filter.value.value)}`;

  return param;
};

export const FilterComboInput = ({
  autoFocus,
  filters,
  currentFilters,
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
  const toLabel = useToLabel();

  const compareFilters = (a: FilterValue, b: FilterValue) => (
    toLabel(a.key) === toLabel(b.key) && toLabel(a.value) === toLabel(b.value)
  );
  const [filterValues, setFilterValues] = React.useState<FilterValue[]>([]);
  const [acValues, setAcValues] = React.useState<FilterValue[]>([]);
  const [collectionShIn, setCollectionShIn] = React.useState<SomeNode[]>([]);
  const { loading, optionsMap } = useMultipleFieldOptions(collectionShIn);

  React.useEffect(() => {
    const valueList: FilterValue[] = [];
    const shInList: SomeNode[] = [];

    for (const filter of filters) {
      const shIn = lrs.getResourceProperty(filter as Node, ontola.filterOptionsIn) as SomeNode;

      if (shIn) {
        if (!loading) {
          for (const option of optionsMap.get(shIn) ?? []) {
            valueList.push({
              key: filter,
              value: option,
            });
          }
        }

        shInList.push(shIn);
      } else {
        for (const value of getFilterValues(lrs, filter)) {
          valueList.push({
            key: filter,
            value,
          });
        }
      }
    }

    setFilterValues(valueList);

    if (!arraysEqual(shInList, collectionShIn)) {
      setCollectionShIn(shInList);
    }
  }, [filters, optionsMap]);

  React.useEffect(() => {
    if (filterValues.length > 0) {
      const currentFilterValues = currentFilters.flatMap((currentFilter) => {
        const values = lrs.getResourceProperties(currentFilter as Node, ontola.filterValue);

        return values.map((val) => ({
          key: currentFilter,
          value: val,
        }));
      });

      const values = filterValues.filter((v) => currentFilterValues.some((cv) => compareFilters(v, cv)));
      setAcValues(values);
    }
  }, [currentFilters, filterValues]);

  React.useEffect(() => {
    if (shown && autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, transitionTime);
    }
  }, [shown, autoFocus]);

  const getOptionLabel = (option: FilterValue) => `${toLabel(option.key)}: ${toLabel(option.value)}`;

  const acFilterOptions = createFilterOptions({
    stringify: getOptionLabel,
  });

  const renderOption = (option: FilterValue, state: AutocompleteRenderOptionState) => {
    const text = toLabel(option.value);

    return (
      <span className={classes.option}>
        <FontAwesome name={state.selected ? 'check-square-o' : 'square-o'} />
        <span>
          {text}
        </span>
      </span>
    );
  };

  const handleChange = (_: ChangeEvent<unknown>, value: FilterValue[]) => {
    const params: string[] = [];

    for (const val of value) {
      params.push(createFilterParam(lrs, val));
    }

    const url = iriTemplate.set({ 'filter%5B%5D': params })?.value ?? '';
    setCollectionResource(rdfcore.namedNode(url));
  };

  return (
    <Autocomplete
      autoComplete
      autoHighlight
      multiple
      openOnFocus
      ChipProps={{ color: 'primary' }}
      classes={overrides}
      filterOptions={acFilterOptions}
      getOptionLabel={getOptionLabel}
      groupBy={(option) => toLabel(option.key) ?? ''}
      options={filterValues}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={inputRef}
          margin="normal"
          placeholder={intl.formatMessage(collectionMessages.filter)}
          variant="outlined"
        />
      )}
      renderOption={renderOption}
      value={acValues}
      onChange={handleChange}
    />
  );
};

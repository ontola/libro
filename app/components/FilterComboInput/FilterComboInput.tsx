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
  isLiteral,
  isNamedNode,
} from '@ontologies/core';
import * as rdf from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import * as xsd from '@ontologies/xsd';
import { term } from '@rdfdev/iri';
import { SomeNode, getTermBestLang } from 'link-lib';
import { LinkReduxLRSType, useLRS } from 'link-redux';
import React, { ChangeEvent } from 'react';
import FontAwesome from 'react-fontawesome';
import { IntlShape, useIntl } from 'react-intl';

import { arraysEqual } from '../../helpers/data';
import { useIRITemplate } from '../../hooks/useIRITemplate';
import useMultipleFieldOptions from '../../hooks/useMultipleFieldOptions';
import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import { booleanTranslation, collectionMessages } from '../../translations/messages';
import { useCollectionOptions } from '../Collection/CollectionProvider';

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

const filterKeyToName = (lrs: LinkReduxLRSType, filter: SomeNode): string => {
  const name = lrs.dig(filter, [ontola.filterKey, rdfs.label]);

  if (name.length === 0) {
    const filterKey = lrs.getResourceProperty(filter, ontola.filterKey);

    return isNamedNode(filterKey) ? term(filterKey) : '';
  }

  return getTermBestLang(name, (lrs as any).store.langPrefs)?.value;
};

const toLabel = (lrs: LinkReduxLRSType, intl: IntlShape, filterTerm: SomeTerm) => {

  if (isLiteral(filterTerm)) {
    if (filterTerm.datatype === xsd.xsdboolean) {
      return intl.formatMessage(booleanTranslation[filterTerm.value]);
    }

    return filterTerm.value;
  }

  const type = lrs.getResourceProperty(filterTerm, rdf.type);

  if (type === ontola.FilterField || type === ontola.CollectionFilter) {
    return filterKeyToName(lrs, filterTerm) ?? '';
  }

  const name = lrs.getResourceProperty(filterTerm as Node, [schema.name, rdfs.label]);

  return name?.value;
};

const getFilterValues = (lrs: LinkReduxLRSType, filter: SomeTerm) => lrs.dig(filter as Node, [ontola.filterOptions, ontola.filterValue]);

const createFilterParam = (lrs: LinkReduxLRSType, filter: FilterValue) => {
  const filterKey = lrs.getResourceProperty(filter.key as SomeNode, ontola.filterKey);
  const param = `${encodeURIComponent(filterKey?.value ?? '')}=${encodeURIComponent(filter.value.value)}`;

  return param;
};

const compareFilters = (lrs: LinkReduxLRSType, intl: IntlShape, a: FilterValue, b: FilterValue) =>
  toLabel(lrs, intl, a.key) === toLabel(lrs, intl, b.key) && toLabel(lrs, intl, a.value) === toLabel(lrs, intl, b.value);

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

      const values = filterValues.filter((v) => currentFilterValues.some((cv) => compareFilters(lrs, intl, v, cv)));
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

  const getOptionLabel = (option: FilterValue) => `${toLabel(lrs, intl, option.key)}: ${toLabel(lrs, intl, option.value)}`;

  const acFilterOptions = createFilterOptions({
    stringify: getOptionLabel,
  });

  const renderOption = (option: FilterValue, state: AutocompleteRenderOptionState) => {
    const text = toLabel(lrs, intl, option.value);

    return (
      <span className={classes.option}>
        <FontAwesome name={state.selected ? 'check-square-o' : 'square-o'} />
        <span>{text}</span>
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
      groupBy={(option) => toLabel(lrs, intl, option.key) ?? ''}
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

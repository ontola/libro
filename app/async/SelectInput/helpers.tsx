import { FilterOptionsState } from '@material-ui/lab';
import { SomeTerm, isLiteral } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import { Resource, useLRS } from 'link-redux';
import React from 'react';

import { entityIsLoaded } from '../../helpers/data';
import { isResource } from '../../helpers/types';
import ontola from '../../ontology/ontola';
import { formMessages } from '../../translations/messages';
import { namePredicates } from '../../views/Thing/properties/name';

const stripDiacritics = (str: string) => (
  typeof str.normalize !== 'undefined'
    ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    : str
);

export const filterOptions = (
  options: SomeTerm[],
  { inputValue, getOptionLabel }: FilterOptionsState<SomeTerm>,
): SomeTerm[] => {
  const input = stripDiacritics(inputValue.toLowerCase());

  return options.filter((option) => {
    const candidate = stripDiacritics(getOptionLabel(option).toLowerCase());

    return candidate.indexOf(input) > -1;
  });
};

export const useItemToString = (): ((i: SomeTerm | undefined | null) => string) => {
  const lrs = useLRS();

  return React.useCallback((item: SomeTerm | undefined | null) => {
    if (typeof item === 'undefined' || item === null) {
      return '';
    }

    if (!isResource(item)) {
      return item.value;
    }

    if (!entityIsLoaded(lrs, item)) {
      return 'Loading';
    }

    const itemClass = lrs.getResourceProperty<SomeNode>(item, rdfx.type);
    const itemClassDisplayProp = lrs.getResourceProperty<SomeNode>(
      itemClass,
      ontola['forms/inputs/select/displayProp'],
    );
    const classDisplayProp = itemClassDisplayProp ?? schema.name;
    const label = lrs.getResourceProperty(item, [classDisplayProp, ...namePredicates]);

    return label?.value ?? item.value;
  }, [lrs]);
};

export function emptyMessage(
  fmt: (args: any) => string,
  searchable: boolean,
  currentValue: string,
): string {
  if (searchable) {
    if (currentValue && currentValue.length > 0) {
      return fmt(formMessages.noMatchingItems);
    }

    return fmt(formMessages.typeToSearch);
  }

  return fmt(formMessages.noMatchingItems);
}

export const renderOption = (item: SomeTerm): JSX.Element => {
  if (isLiteral(item.termType)) {
    return (
      <option
        className="Field__list-element"
        key={item.value}
        value={item.value}
      >
        {item.value}
      </option>
    );
  }

  return (
    <Resource
      element="div"
      key={item.value}
      subject={item}
    />
  );
};

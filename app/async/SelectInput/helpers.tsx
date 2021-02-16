import { FilterOptionsState } from '@material-ui/lab';
import { isLiteral, isNamedNode, SomeTerm } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { Resource, useLRS } from 'link-redux';
import React from 'react';
import { defineMessages } from 'react-intl';
import { entityIsLoaded } from '../../helpers/data';
import { isResource } from '../../helpers/types';
import ontola from '../../ontology/ontola';

const messages = defineMessages({
  noMatchingItems: {
    defaultMessage: 'No matching items',
    id: 'https://app.argu.co/i18n/forms/select/noMatchingItems',
  },
  typeToSearch: {
    defaultMessage: 'Type to start searching',
    id: 'https://app.argu.co/i18n/forms/select/typeToSearch',
  },
});

const stripDiacritics = (str: string) => (
  typeof str.normalize !== 'undefined'
    ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    : str
);

export const filterOptions = (options: SomeTerm[], { inputValue, getOptionLabel }: FilterOptionsState<SomeTerm>) => {
  const input = stripDiacritics(inputValue.toLowerCase());

  return options.filter((option) => {
    const candidate = stripDiacritics(getOptionLabel(option).toLowerCase());

    return candidate.indexOf(input) > -1;
  });
};

export const useItemToString = () => {
  const lrs = useLRS();

  return React.useCallback((item: SomeTerm | undefined | null) => {
    if (typeof item === 'undefined' || item === null) {
      return '';
    }

    if (isResource(item)) {
      if (!entityIsLoaded(lrs, item)) {
        return 'Loading';
      }

      const itemClass = lrs.getResourceProperty(item, rdfx.type);
      const classDisplayProp = (
        isNamedNode(itemClass) && lrs.getResourceProperty(itemClass, ontola.ns('forms/inputs/select/displayProp'))
      ) || schema.name;
      let label = isNamedNode(classDisplayProp) && lrs.getResourceProperty(item, classDisplayProp);
      if (!label) {
        label = lrs.getResourceProperty(item, schema.name);
      }

      return label ? label.value : item.value;
    }

    return item.value;
  }, [lrs]);
};

export function emptyText(fm: (args: any) => string, searchable: boolean, currentValue: string) {
  if (searchable) {
    if (currentValue && currentValue.length > 0) {
      return fm(messages.noMatchingItems);
    }

    return fm(messages.typeToSearch);
  }

  return fm(messages.noMatchingItems);
}

export const renderOption = (item: SomeTerm) => {
  if (isLiteral(item.termType)) {
    return (
      <option
        className="Field__list-element"
        value={item.value}
        key={item.value}
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

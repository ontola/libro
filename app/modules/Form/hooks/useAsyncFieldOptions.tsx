import { SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { dig, useFields } from 'link-redux';
import React from 'react';
import parser from 'uri-template';
import { useDebouncedCallback } from 'use-debounce';

import normalizedLower from '../../Common/lib/i18n';
import { iriFromTemplate } from '../../Common/lib/uriTemplate';
import ontola from '../../Core/ontology/ontola';

import useFieldOptions from './useFieldOptions';

const DEBOUNCE_TIMEOUT = 500;

export interface AsyncFieldOptions {
  loading: boolean;
  options: SomeTerm[];
  searchable: boolean;
}

const useIriTemplateFromCollection = (shIn: SomeNode | undefined) => {
  const [template] = useFields(shIn, dig(ontola.baseCollection, ontola.iriTemplate));

  const searchable = React.useMemo(() => {
    if (!template) {
      return false;
    }

    const searchTemplate = template && parser.parse(template.value);

    return searchTemplate?.expressions?.some((expr) => (
      expr.params.map((param) => param.name).includes('q')
    ));
  }, [template]);

  return searchable ? template : undefined;
};

const useAsyncFieldOptions = (shIn: SomeNode | undefined, inputValue: string): AsyncFieldOptions => {
  const [currentShIn, setCurrentShIn] = React.useState(shIn);
  const searchTemplate = useIriTemplateFromCollection(shIn);
  const { loading, options } = useFieldOptions(currentShIn);
  const [searchInputValue, setSearchInputValue] = React.useState(inputValue);
  const [debouncedSearchInputChange] = useDebouncedCallback(
    (newValue) => {
      setSearchInputValue(newValue);
    },
    DEBOUNCE_TIMEOUT,
    { leading: true },
  );
  React.useEffect(() => {
    if (inputValue !== searchInputValue) {
      debouncedSearchInputChange(inputValue);
    }
  }, [inputValue]);

  React.useEffect(() => {
    if (searchTemplate) {
      const compareValue = searchInputValue && normalizedLower(searchInputValue);
      const searchResultOpts = {} as any;

      const filter = shIn ? new URL(shIn.value).searchParams.getAll('filter[]') : null;
      searchResultOpts.match = 'partial';
      searchResultOpts.page = 1;
      searchResultOpts.q = compareValue?.length > 0 ? compareValue : '*';
      searchResultOpts.fragment = 'members';
      searchResultOpts['filter%5B%5D'] = filter;

      const searchResult = iriFromTemplate(searchTemplate.value, searchResultOpts);
      setCurrentShIn(searchResult);
    } else if (searchInputValue === '') {
      setCurrentShIn(shIn);
    }
  }, [searchInputValue, searchTemplate]);

  return {
    loading,
    options,
    searchable: !!searchTemplate,
  };
};

export default useAsyncFieldOptions;

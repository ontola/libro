import { SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  LinkReduxLRSType,
  useLRS,
} from 'link-redux';
import React from 'react';
import parser from 'uri-template';

import normalizedLower from '../helpers/i18n';
import { iriFromTemplate } from '../helpers/uriTemplate';
import ontola from '../ontology/ontola';

import useFieldOptions from './useFieldOptions';

export interface AsyncFieldOptions {
  loading: boolean;
  options: SomeTerm[];
  searchable: boolean;
}

const iriTemplateFromCollection = (lrs: LinkReduxLRSType, shIn: SomeNode) => {
  const [template] = lrs.dig(shIn, [ontola.baseCollection, ontola.iriTemplate]);
  const searchTemplate = template && parser.parse(template.value);
  const searchable = searchTemplate?.expressions?.some((expr) => (
    expr.params.map((param) => param.name).includes('q')
  ));

  return searchable ? template : undefined;
};

const useAsyncFieldOptions = (open: boolean, shIn: SomeNode | undefined, inputValue: string): AsyncFieldOptions => {
  const lrs = useLRS();
  const [currentShIn, setCurrentShIn] = React.useState(shIn);
  const searchTemplate = React.useMemo(() => shIn && iriTemplateFromCollection(lrs, shIn), [shIn]);
  const { loading, options } = useFieldOptions(currentShIn);

  React.useEffect(() => {
    setCurrentShIn(shIn);
  }, [open]);
  React.useEffect(() => {
    if (inputValue === '') {
      setCurrentShIn(shIn);
    } else if (searchTemplate) {
      const compareValue = inputValue && normalizedLower(inputValue);
      const searchResultOpts = {} as any;
      if (compareValue?.length > 0) {
        const filter = shIn ? new URL(shIn.value).searchParams.getAll('filter[]') : null;
        searchResultOpts.match = 'partial';
        searchResultOpts.page = 1;
        searchResultOpts.q = compareValue;
        searchResultOpts.fragment = 'members';
        searchResultOpts['filter%5B%5D'] = filter;
      }
      const searchResult = iriFromTemplate(searchTemplate.value, searchResultOpts);
      setCurrentShIn(searchResult);
    }
  }, [inputValue]);

  return {
    loading,
    options,
    searchable: !!searchTemplate,
  };
};

export default useAsyncFieldOptions;

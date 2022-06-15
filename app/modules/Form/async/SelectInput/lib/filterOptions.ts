import { FilterOptionsState } from '@mui/material/useAutocomplete';
import { SomeTerm } from '@ontologies/core';

const DIACRITICS_MATCH = /[\u0300-\u036f]/g;

const stripDiacritics = (str: string) => (
  typeof str.normalize !== 'undefined'
    ? str.normalize('NFD').replace(DIACRITICS_MATCH, '')
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

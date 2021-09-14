import { formMessages } from '../../../translations/messages';

const emptyMessage = (
  searchable: boolean,
  currentValue: string,
) => {
  if (!searchable) {
    return formMessages.noMatchingItems;
  }

  const noResults = currentValue && currentValue.length > 0;

  return noResults
    ? formMessages.noMatchingItems
    : formMessages.typeToSearch;
};

export const formatEmptyMessage = (
  fmt: (args: any) => string,
  searchable: boolean,
  currentValue: string,
): string => fmt(emptyMessage(searchable, currentValue));

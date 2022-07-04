import { isNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { ReturnType, useResourceLinks } from 'link-redux';

import ontola from '../../Kernel/ontology/ontola';

export const useFavoriteActions = (actions: SomeNode[], favorite: boolean): SomeNode[] => {
  const favoriteStatuses = useResourceLinks(
    actions,
    { favoriteStatus: ontola.favoriteAction },
    { returnType: ReturnType.Literal },
  );

  return favoriteStatuses
    .filter(({ favoriteStatus }) => !!favoriteStatus === favorite)
    .map(({ subject }) => subject)
    .filter(isNode);
};


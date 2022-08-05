import { isNamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { useLRS } from 'link-redux';
import React, { MouseEventHandler } from 'react';

import { ShowDialog } from '../middleware/actions';

export const useShowDialog = (location: SomeNode): MouseEventHandler => {
  const lrs = useLRS();

  return React.useCallback((e) => {
    e.preventDefault();

    if (isNamedNode(location)) {
      lrs.actions.get(ShowDialog)(location);
    }
  }, [location]);
};

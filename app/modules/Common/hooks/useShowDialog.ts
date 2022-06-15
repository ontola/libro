import { isNamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { useLRS } from 'link-redux';
import React, { MouseEventHandler } from 'react';

export const useShowDialog = (location: SomeNode): MouseEventHandler => {
  const lrs = useLRS();

  return React.useCallback((e) => {
    e.preventDefault();

    if (isNamedNode(location)) {
      lrs.actions.ontola.showDialog(location);
    }
  }, [location]);
};

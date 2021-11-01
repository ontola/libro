import rdf from '@ontologies/core';
import { useAction } from 'link-redux';
import React, { MouseEventHandler } from 'react';

import libro from '../ontology/libro';

export const useShowDialog = (location: string): MouseEventHandler => {
  const showDialog = useAction(rdf.namedNode(`${libro.actions.dialog.alert.value}?resource=${encodeURIComponent(location)}`));

  return React.useCallback((e) => {
    e.preventDefault();

    showDialog();
  }, [showDialog]);
};

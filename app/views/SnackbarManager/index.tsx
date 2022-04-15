import * as rdfx from '@ontologies/rdf';
import {
  Resource,
  register,
  useAction,
  useDataInvalidation,
  useIds,
  useNumbers,
} from 'link-redux';
import React from 'react';

import libro from '../../ontology/libro';
import { allTopologies } from '../../topologies';

export const SnackbarManager = (): JSX.Element | null => {
  const finishSnackbar = useAction(libro.actions.snackbar.finished);
  const [queue] = useIds(libro.ns('snackbar/queue'));
  useDataInvalidation(queue);
  const [currentIndex] = useNumbers(libro.ns('snackbar/current'));
  const [element] = useIds(queue, rdfx.ns(`_${currentIndex}`));

  if (!element) {
    return null;
  }

  return (
    <Resource
      close={finishSnackbar}
      key={element.value}
      subject={element}
    />
  );
};

SnackbarManager.type = libro.ns('snackbar/Manager');

SnackbarManager.topology = allTopologies;

export default [
  register(SnackbarManager),
];

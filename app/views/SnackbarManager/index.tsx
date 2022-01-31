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
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

export const SnackbarManager = (): JSX.Element | null => {
  const finishSnackbar = useAction(libro.actions.snackbar.finished);
  const [queue] = useIds(ontola.ns('snackbar/queue'));
  useDataInvalidation(queue);
  const [currentIndex] = useNumbers(ontola.ns('snackbar/current'));
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

SnackbarManager.type = ontola.ns('snackbar/Manager');

SnackbarManager.topology = allTopologies;

export default [
  register(SnackbarManager),
];

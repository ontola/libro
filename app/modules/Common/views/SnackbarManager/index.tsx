import * as rdfx from '@ontologies/rdf';
import {
  Resource,
  register,
  useActionById,
  useDataInvalidation,
  useIds,
  useNumbers,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../topologies';
import libro from '../../../Kernel/ontology/libro';

export const SnackbarManager = (): JSX.Element | null => {
  const finishSnackbar = useActionById(libro.actions.snackbar.finished);
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

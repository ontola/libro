import { NamedNode } from '@ontologies/core';
import { firstTermOfSeq } from '@rdfdev/collections';
import {
  Resource,
  register,
  useAction,
  useDataInvalidation,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import libro from '../../ontology/libro';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

export const SnackbarManager = (): JSX.Element | null => {
  const lrs = useLRS();
  const finishSnackbar = useAction(libro.actions.snackbar.finished);
  const [queue] = useProperty(ontola.ns('snackbar/queue')) as NamedNode[];
  useDataInvalidation(queue);

  const element = firstTermOfSeq(lrs.store, queue);

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

import { firstTermOfSeq } from '@rdfdev/collections';
import {
  Resource,
  register,
  useDataInvalidation,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import libro from '../../ontology/libro';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

const SnackbarManager = () => {
  const lrs = useLRS();
  const [queue] = useProperty(ontola.ns('snackbar/queue'))
  useDataInvalidation(queue);
  
  const element = firstTermOfSeq(lrs, queue);

  if (!element) {
    return null;
  }

  return (
    <Resource
      close={() => lrs.exec(libro.actions.snackbar.finished)}
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

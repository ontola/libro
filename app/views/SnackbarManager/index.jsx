import { firstTermOfSeq } from '@rdfdev/collections';
import RDFTypes from '@rdfdev/prop-types';
import {
  Resource,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

const SnackbarManager = ({ queue }) => {
  const lrs = useLRS();
  const element = firstTermOfSeq(lrs, queue);

  if (!element) {
    return null;
  }

  return (
    <Resource
      close={() => lrs.exec(ontola.ns('actions/snackbar/finished'))}
      key={element.value}
      subject={element}
    />
  );
};

SnackbarManager.type = ontola.ns('snackbar/Manager');

SnackbarManager.topology = allTopologies;

SnackbarManager.mapDataToProps = {
  dataSubjects: ontola.ns('snackbar/queue'),
  queue: ontola.ns('snackbar/queue'),
};

SnackbarManager.propTypes = {
  queue: RDFTypes.blankNode,
};

export default [
  register(SnackbarManager),
];

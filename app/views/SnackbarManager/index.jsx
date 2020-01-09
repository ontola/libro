import { firstTermOfSeq } from '@rdfdev/collections';
import RDFTypes from '@rdfdev/prop-types';
import {
  Resource,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

const SnackbarManager = ({ queue }) => {
  const lrs = useLRS();
  const element = firstTermOfSeq(lrs, queue);

  if (!element) {
    return null;
  }

  return (
    <Resource
      close={() => lrs.exec(NS.ontola('actions/snackbar/finished'))}
      key={element.value}
      subject={element}
    />
  );
};

SnackbarManager.type = NS.ontola('snackbar/Manager');

SnackbarManager.topology = allTopologies;

SnackbarManager.mapDataToProps = {
  dataSubjects: NS.ontola('snackbar/queue'),
  queue: NS.ontola('snackbar/queue'),
};

SnackbarManager.propTypes = {
  queue: RDFTypes.blankNode,
};

export default [
  register(SnackbarManager),
];

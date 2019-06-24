import {
  LinkedResourceContainer,
  lrsType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import { Collection } from 'rdflib';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

const SnackbarManager = (props) => {
  const queue = props['snackbar/queue'];

  if (queue?.elements.length === 0) {
    return null;
  }

  return (
    <LinkedResourceContainer
      close={() => props.lrs.exec(NS.ontola('actions/snackbar/finished'))}
      key={queue.elements[0].value}
      subject={queue.elements[0]}
    />
  );
};

SnackbarManager.type = NS.ontola('snackbar/Manager');

SnackbarManager.topology = allTopologies;

SnackbarManager.mapDataToProps = [NS.ontola('snackbar/queue')];

SnackbarManager.propTypes = {
  lrs: lrsType,
  'snackbar/queue': PropTypes.instanceOf(Collection),
};

export default [
  register(SnackbarManager),
];

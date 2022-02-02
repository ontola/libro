import { FC, register } from 'link-redux';
import React from 'react';

import CardError from '../../components/Error/CardError';
import { ErrorComponentProps } from '../../components/Error/helpers';
import { ERROR_CLASSES } from '../../helpers/metaData';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { gridTopology } from '../../topologies/Grid';
import { listTopology } from '../../topologies/List';
import { menuTopology } from '../../topologies/Menu';

const ErrorContainer: FC<ErrorComponentProps> = (props) => (
  <CardError {...props} />
);

ErrorContainer.type = ERROR_CLASSES;

ErrorContainer.topology = [
  alertDialogTopology,
  containerTopology,
  menuTopology,
  listTopology,
  gridTopology,
];

export default register(ErrorContainer);

import { FC, register } from 'link-redux';
import React from 'react';

import CardError from '../../components/Error/CardError';
import { ErrorComponentProps } from '../../components/Error/helpers';
import { ERROR_CLASSES } from '../../helpers/metaData';
import {
  alertDialogTopology,
  containerTopology,
  gridTopology,
  listTopology,
  menuTopology,
} from '../../topologies';

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

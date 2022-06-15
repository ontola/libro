import { FC, register } from 'link-redux';
import React from 'react';

import {
  alertDialogTopology,
  containerTopology,
  gridTopology,
  listTopology,
  menuTopology,
} from '../../../../topologies';
import CardError from '../../../Common/components/Error/CardError';
import { ErrorComponentProps } from '../../../Common/components/Error/helpers';
import { ERROR_CLASSES } from '../../../Common/lib/metaData';

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

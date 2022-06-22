import { FC, register } from 'link-redux';
import React from 'react';

import {
  alertDialogTopology,
  containerTopology,
  listTopology,
  menuTopology,
} from '../../../../topologies';
import Card from '../../../../topologies/Card';
import CardContent from '../../../Common/components/Card/CardContent';
import CardError from '../../../Common/components/Error/CardError';
import { ErrorComponentProps } from '../../../Common/components/Error/helpers';
import { ERROR_CLASSES } from '../../../Common/lib/metaData';

const ErrorContainer: FC<ErrorComponentProps> = (props) => (
  <Card>
    <CardContent>
      <CardError {...props} />
    </CardContent>
  </Card>
);

ErrorContainer.type = ERROR_CLASSES;

ErrorContainer.topology = [
  alertDialogTopology,
  containerTopology,
  menuTopology,
  listTopology,
];

export default register(ErrorContainer);

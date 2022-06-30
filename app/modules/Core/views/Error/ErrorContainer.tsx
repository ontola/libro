import { FC, register } from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import CardError from '../../../Common/components/Error/CardError';
import { ErrorComponentProps } from '../../../Common/components/Error/helpers';
import { ERROR_CLASSES } from '../../../Common/lib/metaData';
import Card from '../../../Common/topologies/Card';
import { containerTopology } from '../../../Common/topologies/Container';
import { alertDialogTopology } from '../../../Common/topologies/Dialog';
import { listTopology } from '../../../Common/topologies/List';
import { menuTopology } from '../../../Menu/topologies/Menu';

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

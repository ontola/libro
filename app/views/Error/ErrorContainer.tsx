import { FC, register } from 'link-redux';
import React from 'react';

import CardError from '../../components/Error/CardError';
import { ErrorComponentProps } from '../../components/Error/helpers';
import ll from '../../ontology/ll';
import { cardListTopology } from '../../topologies/Card/CardList';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { gridTopology } from '../../topologies/Grid';
import { menuTopology } from '../../topologies/Menu';

const ErrorContainer: FC<ErrorComponentProps> = (props) => (
  <CardError {...props} />
);

ErrorContainer.type = ll.ErrorResource;

ErrorContainer.topology = [
  alertDialogTopology,
  containerTopology,
  menuTopology,
  cardListTopology,
  gridTopology,
];

export default register(ErrorContainer);

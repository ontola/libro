import { FC, register } from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import CardError from '../../components/Error/CardError';
import { ErrorComponentProps } from '../../components/Error/helpers';
import { ERROR_CLASSES } from '../../lib/metaData';
import CardFixed from '../../topologies/Card/CardFixed';
import { gridTopology } from '../../topologies/Grid';

const ErrorContainer: FC<ErrorComponentProps> = (props) => (
  <CardFixed>
    <CardContent>
      <CardError {...props} />
    </CardContent>
  </CardFixed>
);

ErrorContainer.type = ERROR_CLASSES;

ErrorContainer.topology = gridTopology;

export default register(ErrorContainer);

import { FC, register } from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import CardError from '../../../Common/components/Error/CardError';
import { ErrorComponentProps } from '../../../Common/components/Error/helpers';
import { ERROR_CLASSES } from '../../../Common/lib/metaData';
import CardFixed from '../../../Common/topologies/Card/CardFixed';
import { gridTopology } from '../../../Common/topologies/Grid';

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

import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { FC } from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import CardError from '../../components/Error/CardError';
import { ErrorComponentProps } from '../../components/Error/helpers';
import { ERROR_CLASSES } from '../../lib/metaData';
import {
  alertDialogTopology,
  containerTopology,
  listTopology, 
} from '../../topologies';
import Card from '../../topologies/Card';

export const ErrorContainer: FC<ErrorComponentProps> = (props) => (
  <Card>
    <CardContent>
      <CardError {...props} />
    </CardContent>
  </Card>
);

ErrorContainer.type = ERROR_CLASSES;

export default LinkedRenderStore.registerRenderer(
  ErrorContainer,
  ERROR_CLASSES,
  RENDER_CLASS_NAME,
  [
    alertDialogTopology,
    containerTopology,
    listTopology,
  ],
);

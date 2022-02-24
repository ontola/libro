import * as schema from '@ontologies/schema';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import LinkedMediaViewer from '../../components/MediaViewer/LinkedMediaViewer';
import Card from '../../topologies/Card';
import { alertDialogTopology } from '../../topologies/Dialog';

const MediaObjectContainer: FC = () => (
  <Card>
    <CardContent endSpacing>
      <LinkedMediaViewer />
    </CardContent>
  </Card>
);

MediaObjectContainer.type = [
  schema.MediaObject,
  schema.ImageObject,
  schema.VideoObject,
];

MediaObjectContainer.topology = alertDialogTopology;

export default register(MediaObjectContainer);

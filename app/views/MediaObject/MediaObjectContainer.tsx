import * as schema from '@ontologies/schema';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import LinkedMediaViewer from '../../components/MediaViewer/LinkedMediaViewer';
import Card from '../../topologies/Card';
import { containerTopology } from '../../topologies/Container';

const MediaObjectContainer: FC = () => (
  <Card>
    <CardContent endSpacing>
      <LinkedMediaViewer downloadSection />
    </CardContent>
  </Card>
);

MediaObjectContainer.type = [
  schema.MediaObject,
  schema.ImageObject,
  schema.VideoObject,
];

MediaObjectContainer.topology = containerTopology;

export default register(MediaObjectContainer);

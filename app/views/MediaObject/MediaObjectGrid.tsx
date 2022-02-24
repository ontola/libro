import * as schema from '@ontologies/schema';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import LinkedMediaViewer from '../../components/MediaViewer/LinkedMediaViewer';
import CardFixed from '../../topologies/Card/CardFixed';
import { gridTopology } from '../../topologies/Grid';

const MediaObjectGrid: FC = () => (
  <CardFixed>
    <CardContent noSpacing>
      <LinkedMediaViewer downloadSection />
    </CardContent>
  </CardFixed>
);

MediaObjectGrid.type = [
  schema.MediaObject,
  schema.ImageObject,
  schema.VideoObject,
];

MediaObjectGrid.topology = gridTopology;

export default register(MediaObjectGrid);

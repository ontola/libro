import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { gridTopology } from '../../../../topologies';
import CardFixed from '../../../../topologies/Card/CardFixed';
import CardContent from '../../components/Card/CardContent';

const MediaObjectGrid: FC = () => (
  <CardFixed>
    <CardContent noSpacing>
      <Property label={schema.contentUrl} />
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

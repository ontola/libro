import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { containerTopology } from '../../topologies';
import Card from '../../topologies/Card';

const MediaObjectContainer: FC = () => (
  <Card>
    <CardContent endSpacing>
      <Property label={schema.contentUrl} />
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

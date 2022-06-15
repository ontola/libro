import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { fullResourceTopology } from '../../../../topologies';
import Container from '../../../../topologies/Container';

const MediaObjectFull: FC = () => (
  <Container>
    <Property label={schema.contentUrl} />
  </Container>
);

MediaObjectFull.type = [
  schema.MediaObject,
  schema.ImageObject,
  schema.VideoObject,
];

MediaObjectFull.topology = fullResourceTopology;

export default register(MediaObjectFull);

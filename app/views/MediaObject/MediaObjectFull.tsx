import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

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

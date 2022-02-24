import * as schema from '@ontologies/schema';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import LinkedMediaViewer from '../../components/MediaViewer/LinkedMediaViewer';
import WebMonetization from '../../components/WebMonetization';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

const MediaObjectFull: FC = () => (
  <WebMonetization>
    <Container>
      <LinkedMediaViewer downloadSection />
    </Container>
  </WebMonetization>
);

MediaObjectFull.type = [
  schema.MediaObject,
  schema.ImageObject,
  schema.VideoObject,
];

MediaObjectFull.topology = fullResourceTopology;

export default register(MediaObjectFull);

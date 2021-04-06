import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { parentProps } from '../../ontology/app';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

import './MediaObjectPage.scss';

interface PropTypes {
  renderPartOf: boolean;
}

const MediaObjectFull: FC<PropTypes> = ({
  renderPartOf,
}) => (
  <Container>
    {renderPartOf && <Property label={parentProps} />}
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

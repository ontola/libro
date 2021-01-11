import dcterms from '@ontologies/dcterms';
import schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

import './MediaObjectPage.scss';

interface PropTypes {
  renderPartOf: boolean;
}

const MediaObjectFull: FC<PropTypes> = ({
  renderPartOf,
}) => (
  <React.Fragment>
    <Container>
      {renderPartOf && <Property label={[schema.isPartOf, dcterms.isReferencedBy]} />}
      <Property label={schema.contentUrl} />
    </Container>
  </React.Fragment>
);

MediaObjectFull.type = [
  schema.MediaObject,
  schema.ImageObject,
  schema.VideoObject,
];

MediaObjectFull.topology = fullResourceTopology;

export default register(MediaObjectFull);

import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import MapView from '../../containers/MapView';
import argu from '../../ontology/argu';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

const PlacementAlertDialog = ({
  renderPartOf,
  subject,
}) => (
  <Container>
    {renderPartOf && <Property label={schema.isPartOf} />}
    <MapView
      placements={[subject]}
    />
  </Container>
);

PlacementAlertDialog.type = argu.Placement;

PlacementAlertDialog.topology = fullResourceTopology;

PlacementAlertDialog.propTypes = {
  renderPartOf: PropTypes.bool,
  subject: subjectType,
};

export default register(PlacementAlertDialog);

import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';

import MapView from '../../containers/MapView';
import argu from '../../ontology/argu';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

interface PlacementAlertDialogProps extends SubjectProp {
  renderPartOf: boolean;
}

const PlacementAlertDialog = ({
  renderPartOf,
  subject,
}: PlacementAlertDialogProps): JSX.Element => {
  const placements = React.useMemo(() => [subject], [subject]);

  return (
    <Container>
      {renderPartOf && <Property label={schema.isPartOf} />}
      <MapView placements={placements} />
    </Container>
  );
};

PlacementAlertDialog.type = argu.Placement;

PlacementAlertDialog.topology = fullResourceTopology;

export default register(PlacementAlertDialog);

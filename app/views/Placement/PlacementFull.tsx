import { FC, register } from 'link-redux';
import React from 'react';

import MapView from '../../modules/MapView/components/MapView';
import argu from '../../ontology/argu';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

const PlacementAlertDialog: FC = ({
  subject,
}) => {
  const placements = React.useMemo(() => [subject], [subject]);

  return (
    <Container>
      <MapView placements={placements} />
    </Container>
  );
};

PlacementAlertDialog.type = argu.Placement;

PlacementAlertDialog.topology = fullResourceTopology;

export default register(PlacementAlertDialog);

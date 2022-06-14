import { FC, register } from 'link-redux';
import React from 'react';

import PlacementsMap from '../../modules/Maps/components/PlacementsMap';
import argu from '../../ontology/argu';
import { fullResourceTopology } from '../../topologies';
import Container from '../../topologies/Container';

const PlacementAlertDialog: FC = ({
  subject,
}) => {
  const placements = React.useMemo(() => [subject], [subject]);

  return (
    <Container>
      <PlacementsMap placements={placements} />
    </Container>
  );
};

PlacementAlertDialog.type = argu.Placement;

PlacementAlertDialog.topology = fullResourceTopology;

export default register(PlacementAlertDialog);

import { FC, register } from 'link-redux';
import React from 'react';

import Container from '../../../Common/topologies/Container';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import PlacementsMap from '../../../Map/components/PlacementsMap';
import argu from '../../lib/argu';

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

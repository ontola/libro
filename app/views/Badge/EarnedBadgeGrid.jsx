import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  useDataFetching,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import Heading from '../../components/Heading';
import Image from '../../components/Image';
import teamGL from '../../ontology/teamGL';
import { gridTopology } from '../../topologies/Grid';

const PENDING_BADGE_OPACITY = 0.2;

const EarnedBadgeGrid = ({
  badge,
  dateCreated,
}) => {
  useDataFetching([badge]);
  const [image] = useResourceProperty(badge, schema.image);
  const [name] = useResourceProperty(badge, schema.name);

  return (
    <div
      style={{
        opacity: dateCreated ? 1 : PENDING_BADGE_OPACITY,
        textAlign: 'center',
      }}
    >
      <Property label={teamGL.badge}>
        <Heading size="2">{name?.value}</Heading>
        <Image
          linkedProp={image}
          style={{
            height: '180px',
            marginBottom: '1em',
            maxWidth: '100%',
            width: '180px',
          }}
        />
        <Property label={schema.description} />
      </Property>
    </div>
  );
};

EarnedBadgeGrid.type = teamGL.EarnedBadge;

EarnedBadgeGrid.topology = [
  gridTopology,
];

EarnedBadgeGrid.mapDataToProps = {
  badge: teamGL.badge,
  dateCreated: schema.dateCreated,
};

EarnedBadgeGrid.propTypes = {
  badge: linkType,
  dateCreated: linkType,
};

export default register(EarnedBadgeGrid);

import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import { ShowDialog } from '../../../Common/middleware/actions';
import { listTopology } from '../../../Common/topologies';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import HoverBox from '../../../Common/topologies/HoverBox';
import teamGL from '../../ontology/teamGL';

const EventList: FC = ({
  subject,
}) => {
  const lrs = useLRS();

  return (
    <HoverBox
      hiddenChildren={<Property label={schema.text} />}
      onClick={() => {
        lrs.actions.get(ShowDialog)(subject);
      }}
    >
      <Property label={schema.name} />
      <ContentDetails>
        <Property label={teamGL.eventType} />
        <Property label={teamGL.participantsCount} />
        <Property label={teamGL.department} />
        <Property label={schema.startDate} />
        <Property label={schema.location} />
      </ContentDetails>
    </HoverBox>
  );
};

EventList.type = teamGL.Event;

EventList.topology = listTopology;

export default register(EventList);

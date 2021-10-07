import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import teamGL from '../../../../ontology/teamGL';
import { cardListTopology } from '../../../../topologies/Card/CardList';
import ContentDetails from '../../../../topologies/ContentDetails';
import HoverBox from '../../../../topologies/HoverBox';

const EventCardList: FC = ({
  subject,
}) => {
  const lrs = useLRS();

  return (
    <HoverBox
      hiddenChildren={<Property label={schema.text} />}
      onClick={() => {
        lrs.actions.ontola.showDialog(subject);
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

EventCardList.type = teamGL.Event;

EventCardList.topology = cardListTopology;

export default register(EventCardList);

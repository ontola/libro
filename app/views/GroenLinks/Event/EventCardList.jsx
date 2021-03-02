import * as schema from '@ontologies/schema';
import {
  Property, register, subjectType, useLRS,
} from 'link-redux';
import React from 'react';

import teamGL from '../../../ontology/teamGL';
import { cardListTopology } from '../../../topologies/Card/CardList';
import ContentDetails from '../../../topologies/ContentDetails';
import hoverBox from '../../../topologies/HoverBox';

const CardHoverBox = hoverBox();

const EventCardList = ({
  subject,
}) => {
  const lrs = useLRS();

  return (
    <CardHoverBox
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
    </CardHoverBox>
  );
};

EventCardList.type = teamGL.Event;

EventCardList.topology = cardListTopology;

EventCardList.propTypes = {
  subject: subjectType,
};

export default register(EventCardList);

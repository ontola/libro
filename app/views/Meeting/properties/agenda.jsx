import schema from '@ontologies/schema';
import {
  Resource,
  linkedPropType,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import { listToArr } from '../../../helpers/data';
import { handle } from '../../../helpers/logging';
import { tryParseFloat, tryParseInt } from '../../../helpers/numbers';
import meeting from '../../../ontology/meeting';
import { allTopologies } from '../../../topologies';

function toCompactList(arr) {
  const s = new Set(arr);
  s.delete(undefined);
  s.delete(null);

  return Array.from(s);
}

const Agenda = ({ agenda, subject }) => {
  const lrs = useLRS();

  const ordered = [];
  const unordered = [];
  const agendaArray = listToArr(lrs, [], agenda);

  agendaArray
    .forEach((s) => {
      const order = lrs.getResourceProperty(s, schema.position);
      if (order) {
        const i = tryParseInt(order);
        ordered[i] = s;
      } else {
        unordered.push(s);
      }
    });

  if (ordered.length + unordered.length === 0) {
    handle(new Error(`Rendered prop agenda for ${subject} without items`));

    return null;
  }

  const orderedCompact = toCompactList(ordered);
  const unorderedCompact = toCompactList(unordered);

  return (
    <React.Fragment>
      <React.Fragment>
        {orderedCompact.map((p) => <Resource subject={p} />)}
      </React.Fragment>
      <React.Fragment>
        {unorderedCompact.map((p) => <Resource subject={p} />)}
      </React.Fragment>
    </React.Fragment>
  );
};

Agenda.type = meeting.Meeting;

Agenda.property = meeting.agenda;

Agenda.topology = allTopologies;

Agenda.mapDataToProps = {
  agenda: meeting.agenda,
};

Agenda.propTypes = {
  agenda: linkedPropType,
  subject: subjectType,
};

export default register(Agenda);

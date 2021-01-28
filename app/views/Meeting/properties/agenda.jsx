import * as schema from '@ontologies/schema';
import {
  Resource,
  ReturnType,
  linkedPropType,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import { handle } from '../../../helpers/logging';
import meeting from '../../../ontology/meeting';
import { allTopologies } from '../../../topologies';

const DECIMAL = 10;

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

  agenda
    .forEach((s) => {
      const order = lrs.store.find(s.object, schema.position, null, null);
      if (order) {
        const i = Number.parseInt(order.object.value, DECIMAL);
        ordered[i] = s.object;
      } else {
        unordered.push(s.object);
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
  agenda: {
    label: meeting.agenda,
    returnType: ReturnType.AllStatements,
  },
};

Agenda.propTypes = {
  agenda: linkedPropType,
  subject: subjectType,
};

export default register(Agenda);

import { SomeTerm, isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Resource,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import LinkLoader from '../../../components/Loading/LinkLoader';
import { handle } from '../../../helpers/logging';
import { tryParseInt } from '../../../helpers/numbers';
import { useListToArr } from '../../../hooks/useListToArr';
import meeting from '../../../ontology/meeting';
import { allTopologies } from '../../../topologies';

function toCompactList(arr: Array<SomeTerm | null | undefined>): SomeTerm[] {
  const s = new Set(arr);
  s.delete(undefined);
  s.delete(null);

  return Array.from(s) as SomeTerm[];
}

interface PropTypes {
  linkedProp: SomeNode;
}

const Agenda: FC<PropTypes> = ({ linkedProp, subject }) => {
  const lrs = useLRS();
  const [agendaArray, loaded] = useListToArr<SomeNode>(linkedProp);

  const ordered: SomeTerm[] = [];
  const unordered: SomeTerm[] = [];

  if (!loaded) {
    return <LinkLoader />;
  }

  agendaArray
    .forEach((s) => {
      const order = isNode(s) && tryParseInt(lrs.getResourceProperty(s, schema.position));

      if (order) {
        ordered[order] = s;
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
        {orderedCompact.map((p) => <Resource key={p.value} subject={p} />)}
      </React.Fragment>
      <React.Fragment>
        {unorderedCompact.map((p) => <Resource key={p.value} subject={p} />)}
      </React.Fragment>
    </React.Fragment>
  );
};

Agenda.type = meeting.Meeting;

Agenda.property = meeting.agenda;

Agenda.topology = allTopologies;

export default register(Agenda);

import rdf from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import TableCells from '../../../components/TableCells';
import { tryParseInt } from '../../../helpers/numbers';
import { useCurrentActor } from '../../../hooks/useCurrentActor';
import teamGL from '../../../ontology/teamGL';
import { tableTopology } from '../../../topologies/Table';
import TableRow from '../../../topologies/TableRow';

interface StreetTableProps {
  subject: SomeNode;
}

const StreetTable: FC<StreetTableProps> = ({
  subject,
}) => {
  const lrs = useLRS();
  const { actorType } = useCurrentActor();
  const [pendingFlyerCount] = useProperty(teamGL.pendingFlyerCount);
  const pendingFlyers = tryParseInt(pendingFlyerCount);
  const hasAction = pendingFlyers && pendingFlyers > 0;

  const onClick = React.useCallback((e) => {
    e.preventDefault();
    const formIRI = rdf.namedNode(`${subject.value}/flyer_actions/new`);
    if (actorType?.value === 'GuestUser') {
      lrs.actions.app.startSignIn(formIRI);
    } else {
      lrs.actions.ontola.showDialog(formIRI);
    }
  }, [subject, actorType]);

  return (
    <TableRow onClick={hasAction ? onClick : undefined}>
      <TableCells />
    </TableRow>
  );
};

StreetTable.type = teamGL.Street;

StreetTable.topology = tableTopology;

export default register(StreetTable);
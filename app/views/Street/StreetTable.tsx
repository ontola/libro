import rdf from '@ontologies/core';
import {
  FC,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import TableCells from '../../components/TableCells';
import { tryParseInt } from '../../helpers/numbers';
import { useCurrentActor } from '../../hooks/useCurrentActor';
import teamGL from '../../ontology/teamGL';
import { tableTopology } from '../../topologies/Table';
import TableRow from '../../topologies/TableRow';
import { ColumnType } from '../Thing/ThingTable';

interface StreetTableProps {
  columns: ColumnType[];
}

const StreetTable: FC<StreetTableProps> = ({
  columns,
  subject,
}) => {
  const lrs = useLRS();
  const { actorType } = useCurrentActor();
  const [pendingFlyerCount] = useProperty(teamGL.pendingFlyerCount);
  const pendingFlyers = tryParseInt(pendingFlyerCount);

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
    <TableRow onClick={pendingFlyers && pendingFlyers > 0 ? onClick : undefined}>
      <TableCells columns={columns} />
    </TableRow>
  );
};

StreetTable.type = teamGL.Street;

StreetTable.topology = tableTopology;

export default register(StreetTable);

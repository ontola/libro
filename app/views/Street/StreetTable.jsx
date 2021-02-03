import rdf from '@ontologies/core';
import {
  register,
  subjectType,
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
import { columnsType } from '../Thing/ThingTable';

const StreetTable = (props) => {
  const lrs = useLRS();
  const { actorType } = useCurrentActor();
  const [pendingFlyerCount] = useProperty(teamGL.pendingFlyerCount);
  const pendingFlyers = tryParseInt(pendingFlyerCount);

  const onClick = React.useCallback((e) => {
    e.preventDefault();
    const formIRI = rdf.namedNode(`${props.subject.value}/flyer_actions/new`);
    if (actorType?.value === 'GuestUser') {
      lrs.actions.app.startSignIn(formIRI);
    } else {
      lrs.actions.ontola.showDialog(formIRI);
    }
  }, [props.subject, actorType]);

  return (
    <TableRow onClick={pendingFlyers && pendingFlyers > 0 ? onClick : undefined}>
      <TableCells columns={props.columns} />
    </TableRow>
  );
};

StreetTable.type = teamGL.Street;

StreetTable.topology = tableTopology;

StreetTable.propTypes = {
  columns: columnsType,
  subject: subjectType,
};

export default register(StreetTable);

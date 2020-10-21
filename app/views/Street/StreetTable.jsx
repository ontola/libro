import rdf from '@ontologies/core';
import {
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import TableCells from '../../components/TableCells';
import { useCurrentActor } from '../../hooks/useCurrentActor';
import teamGL from '../../ontology/teamGL';
import { tableTopology } from '../../topologies/Table';
import TableRow from '../../topologies/TableRow';
import { columnsType } from '../Thing/ThingTable';

const StreetTable = (props) => {
  const lrs = useLRS();
  const { actorType } = useCurrentActor();

  const onClick = (e) => {
    e.preventDefault();
    const formIRI = rdf.namedNode(`${props.subject.value}/flyer_actions/new`);
    if (actorType?.value === 'GuestUser') {
      lrs.actions.app.startSignIn(formIRI);
    } else {
      lrs.actions.ontola.showDialog(formIRI);
    }
  };

  return (
    <TableRow onClick={onClick}>
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

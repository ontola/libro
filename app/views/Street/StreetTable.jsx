import rdf from '@ontologies/core';
import {
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import TableCells from '../../components/TableCells';
import teamGL from '../../ontology/teamGL';
import { tableTopology } from '../../topologies/Table';
import TableRow from '../../topologies/TableRow';
import { columnsType } from '../Thing/ThingTable';

const StreetTable = (props) => {
  const lrs = useLRS();

  const onClick = (e) => {
    e.preventDefault();
    lrs.actions.ontola.showDialog(rdf.namedNode(`${props.subject.value}/flyer_actions/new`));
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

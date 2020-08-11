import { register, subjectType } from 'link-redux';
import React from 'react';
import { useHistory } from 'react-router';

import TableCells from '../../components/TableCells';
import { retrievePath } from '../../helpers/iris';
import teamGL from '../../ontology/teamGL';
import { tableTopology } from '../../topologies/Table';
import TableRow from '../../topologies/TableRow';
import { columnsType } from '../Thing/ThingTable';

const StreetTable = (props) => {
  const history = useHistory();

  const onClick = (e) => {
    e.preventDefault();
    history.push(retrievePath(props.subject.value));
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

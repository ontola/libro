import { NamedNode } from '@ontologies/core';
import {
  FC,
  register,
  useLRS,
} from 'link-redux';
import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router';

import TableCells from '../../components/TableCells';
import { entityIsLoaded } from '../../helpers/data';
import { retrievePath } from '../../helpers/iris';
import { useCurrentActor } from '../../hooks/useCurrentActor';
import ontola from '../../ontology/ontola';
import teamGL from '../../ontology/teamGL';
import { tableTopology } from '../../topologies/Table';
import TableRow from '../../topologies/TableRow';
import { ColumnType } from '../Thing/ThingTable';

interface AddressTableProps {
  columns: ColumnType;
  createAction: NamedNode;
}

const AddressTable: FC<AddressTableProps> = (props) => {
  const lrs = useLRS();
  const history = useHistory();
  const { actorType } = useCurrentActor();

  const onClick = (e: MouseEvent) => {
    if (actorType?.value === 'GuestUser') {
      e.preventDefault();
      lrs.actions.app.startSignIn(props.subject);
    } else {
      e.preventDefault();
      if (__CLIENT__ && !entityIsLoaded(lrs, props.createAction)) {
        lrs.queueEntity(props.createAction);
      }
      history.push(retrievePath(props.subject.value));
    }
  };

  return (
    <TableRow onClick={onClick}>
      <TableCells columns={props.columns} />
    </TableRow>
  );
};

AddressTable.type = teamGL.Address;

AddressTable.topology = tableTopology;

AddressTable.mapDataToProps = {
  createAction: ontola.createAction,
};

export default register(AddressTable);

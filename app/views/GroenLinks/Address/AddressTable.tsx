import { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useLRS,
} from 'link-redux';
import React, { MouseEvent } from 'react';

import TableCells from '../../../components/TableCells';
import { entityIsLoaded } from '../../../helpers/data';
import { useCurrentActor } from '../../../hooks/useCurrentActor';
import ontola from '../../../ontology/ontola';
import teamGL from '../../../ontology/teamGL';
import { tableTopology } from '../../../topologies/Table';
import TableRow from '../../../topologies/TableRow';

interface AddressTableProps {
  createAction: NamedNode;
  subject: SomeNode;
}

const AddressTable: FC<AddressTableProps> = (props) => {
  const lrs = useLRS();
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
      lrs.actions.ontola.showDialog(props.subject);
    }
  };

  return (
    <TableRow onClick={onClick}>
      <TableCells />
    </TableRow>
  );
};

AddressTable.type = teamGL.Address;

AddressTable.topology = tableTopology;

AddressTable.mapDataToProps = {
  createAction: ontola.createAction,
};

export default register(AddressTable);

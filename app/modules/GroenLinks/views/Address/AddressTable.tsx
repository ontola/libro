import {
  FC,
  register,
  useGlobalIds,
  useLRS,
} from 'link-redux';
import React, { MouseEvent } from 'react';

import { useCurrentActor } from '../../../Auth/hooks/useCurrentActor';
import { entityIsLoaded } from '../../../Kernel/lib/data';
import ontola from '../../../Kernel/ontology/ontola';
import TableCells from '../../../Table/components/TableCells';
import { tableTopology } from '../../../Table/topologies/Table';
import TableRow from '../../../Table/topologies/TableRow';
import teamGL from '../../ontology/teamGL';

const AddressTable: FC = ({ subject }) => {
  const lrs = useLRS();
  const [createAction] = useGlobalIds(ontola.createAction);
  const { actorType } = useCurrentActor();

  const onClick = (e: MouseEvent) => {
    if (actorType?.value === 'GuestUser') {
      e.preventDefault();
      lrs.actions.app.startSignIn(subject);
    } else {
      e.preventDefault();

      if (__CLIENT__ && !entityIsLoaded(lrs, createAction)) {
        lrs.queueEntity(createAction);
      }

      lrs.actions.ontola.showDialog(subject);
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

export default register(AddressTable);

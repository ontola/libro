import {
  FC,
  register,
  useGlobalIds,
  useLRS,
} from 'link-redux';
import React, { MouseEvent } from 'react';

import TableCells from '../../../../components/TableCells';
import { entityIsLoaded } from '../../../../helpers/data';
import { useCurrentActor } from '../../../../hooks/useCurrentActor';
import ontola from '../../../../ontology/ontola';
import teamGL from '../../../../ontology/teamGL';
import { tableTopology } from '../../../../topologies/Table';
import TableRow from '../../../../topologies/TableRow';

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

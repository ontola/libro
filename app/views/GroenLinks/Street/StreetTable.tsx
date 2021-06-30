import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import TableCells from '../../../components/TableCells';
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
  const onClick = React.useCallback((e) => {
    e.preventDefault();
    if (actorType?.value === 'GuestUser') {
      lrs.actions.app.startSignIn(subject);
    } else {
      lrs.actions.ontola.navigate(subject);
    }
  }, [subject, actorType]);

  return (
    <TableRow onClick={onClick}>
      <TableCells />
    </TableRow>
  );
};

StreetTable.type = teamGL.Street;

StreetTable.topology = tableTopology;

export default register(StreetTable);

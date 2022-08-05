import { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useLRS,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';

import { StartSignIn } from '../../../../middleware/actions';
import { useCurrentActor } from '../../../Auth/hooks/useCurrentActor';
import { Navigate } from '../../../Common/middleware/actions';
import TableCells from '../../../Table/components/TableCells';
import { tableTopology } from '../../../Table/topologies/Table';
import TableRow from '../../../Table/topologies/TableRow';
import teamGL from '../../ontology/teamGL';

interface StreetTableProps {
  subject: SomeNode;
}

const StreetTable: FC<StreetTableProps> = ({
  subject,
}) => {
  const lrs = useLRS();
  const { actorType } = useCurrentActor();
  const onClick = React.useCallback<MouseEventHandler>((e) => {
    e.preventDefault();

    if (actorType?.value === 'GuestUser') {
      lrs.actions.get(StartSignIn)(subject as NamedNode);
    } else {
      lrs.actions.get(Navigate)(subject as NamedNode);
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

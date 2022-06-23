import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useLRS,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';

import teamGL from '../../ontology/teamGL';
import { tableTopology } from '../../../../topologies';
import TableRow from '../../../../topologies/TableRow';
import { useCurrentActor } from '../../../Auth/hooks/useCurrentActor';
import TableCells from '../../../Common/components/TableCells';

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

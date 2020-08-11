import {
  linkType,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';
import { useHistory } from 'react-router';

import TableCells from '../../components/TableCells';
import { entityIsLoaded } from '../../helpers/data';
import { retrievePath } from '../../helpers/iris';
import { useCurrentActor } from '../../hooks/useCurrentActor';
import ontola from '../../ontology/ontola';
import teamGL from '../../ontology/teamGL';
import { tableTopology } from '../../topologies/Table';
import TableRow from '../../topologies/TableRow';
import { columnsType } from '../Thing/ThingTable';

const AddressTable = (props) => {
  const lrs = useLRS();
  const history = useHistory();
  const { actorType } = useCurrentActor();

  const onClick = (e) => {
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

AddressTable.propTypes = {
  columns: columnsType,
  createAction: linkType,
  subject: subjectType,
};

export default register(AddressTable);

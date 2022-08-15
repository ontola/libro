import { NamedNode } from '@ontologies/core';
import {
  FC,
  Property,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { HideDialog, Navigate } from '../../../Common/middleware/actions';
import { alertDialogTopology, fullResourceTopology } from '../../../Common/topologies';
import ontola from '../../../Kernel/ontology/ontola';
import teamGL from '../../ontology/teamGL';

const AddressFull: FC = () => {
  const lrs = useLRS();
  const [street] = useProperty(teamGL.street);
  const goToStreet = React.useCallback(() => {
    lrs.actions.get(Navigate)(street as NamedNode);
  }, [lrs]);

  return (
    <Property
      label={ontola.createAction}
      onCancel={goToStreet}
      onDone={lrs.actions.get(HideDialog)}
    />
  );
};

AddressFull.type = teamGL.Address;

AddressFull.topology = [
  alertDialogTopology,
  fullResourceTopology,
];

export default register(AddressFull);

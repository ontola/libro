import {
  FC,
  Property,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { alertDialogTopology } from '../../../Common/topologies/Dialog';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import ontola from '../../../Kernel/ontology/ontola';
import teamGL from '../../ontology/teamGL';

const AddressFull: FC = () => {
  const lrs = useLRS();
  const [street] = useProperty(teamGL.street);
  const goToStreet = React.useCallback(() => {
    lrs.actions.ontola.navigate(street);
  }, [lrs]);

  return (
    <Property
      label={ontola.createAction}
      onCancel={goToStreet}
      onDone={lrs.actions.ontola.hideDialog}
    />
  );
};

AddressFull.type = teamGL.Address;

AddressFull.topology = [
  alertDialogTopology,
  fullResourceTopology,
];

export default register(AddressFull);

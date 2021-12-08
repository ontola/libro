import {
  FC,
  Property,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { retrievePath } from '../../../../helpers/iris';
import ontola from '../../../../ontology/ontola';
import teamGL from '../../../../ontology/teamGL';
import { alertDialogTopology } from '../../../../topologies/Dialog';
import { fullResourceTopology } from '../../../../topologies/FullResource';

const AddressFull: FC = () => {
  const lrs = useLRS();
  const [street] = useProperty(teamGL.street);

  return (
    <Property
      cancelPath={retrievePath((street?.value))}
      label={ontola.createAction}
      responseCallback={lrs.actions.ontola.hideDialog}
    />
  );
};

AddressFull.type = teamGL.Address;

AddressFull.topology = [
  alertDialogTopology,
  fullResourceTopology,
];

export default register(AddressFull);

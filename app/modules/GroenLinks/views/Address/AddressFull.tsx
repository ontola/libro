import {
  FC,
  Property,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import ontola from '../../../../ontology/ontola';
import teamGL from '../../../../ontology/teamGL';
import { alertDialogTopology, fullResourceTopology } from '../../../../topologies';

const AddressFull: FC = () => {
  const lrs = useLRS();
  const [street] = useProperty(teamGL.street);
  const goToStreet = React.useCallback(() => {
    lrs.actions.ontola.navigate(street);
  }, [lrs]);

  return (
    <Property
      label={ontola.createAction}
      responseCallback={lrs.actions.ontola.hideDialog}
      onCancel={goToStreet}
    />
  );
};

AddressFull.type = teamGL.Address;

AddressFull.topology = [
  alertDialogTopology,
  fullResourceTopology,
];

export default register(AddressFull);

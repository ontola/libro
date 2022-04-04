import rdf from '@ontologies/core';
import {
  FC,
  Property,
  register,
  useAction,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import libro from '../../../../ontology/libro';
import ontola from '../../../../ontology/ontola';
import teamGL from '../../../../ontology/teamGL';
import { alertDialogTopology, fullResourceTopology } from '../../../../topologies';

const AddressFull: FC = () => {
  const lrs = useLRS();
  const [street] = useProperty(teamGL.street);
  const goToStreet = useAction(rdf.namedNode(`${libro.actions.redirect}?location=${encodeURIComponent(street.value)}`));

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

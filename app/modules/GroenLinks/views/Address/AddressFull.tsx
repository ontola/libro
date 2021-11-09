import rdf from '@ontologies/core';
import {
  FC,
  Property,
  register,
  useAction,
  useProperty,
} from 'link-redux';
import React from 'react';

import libro from '../../../../ontology/libro';
import ontola from '../../../../ontology/ontola';
import teamGL from '../../../../ontology/teamGL';
import { alertDialogTopology } from '../../../../topologies/Dialog';
import { fullResourceTopology } from '../../../../topologies/FullResource';
import { OnDoneHandler } from '../../../../views/Action/helpers';

interface AddressFullProps {
  onDone?: OnDoneHandler;
}

const AddressFull: FC<AddressFullProps> = ({
  onDone,
}) => {
  const [street] = useProperty(teamGL.street);
  const goToStreet = useAction(rdf.namedNode(`${libro.actions.redirect}?location=${encodeURIComponent(street.value)}`));

  return (
    <Property
      label={ontola.createAction}
      onCancel={goToStreet}
      onDone={onDone}
    />
  );
};

AddressFull.type = teamGL.Address;

AddressFull.topology = [
  alertDialogTopology,
  fullResourceTopology,
];

export default register(AddressFull);

import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { retrievePath } from '../../../../helpers/iris';
import ontola from '../../../../ontology/ontola';
import teamGL from '../../../../ontology/teamGL';
import Container from '../../../../topologies/Container';
import { alertDialogTopology } from '../../../../topologies/Dialog';
import { fullResourceTopology } from '../../../../topologies/FullResource';
import { OnDoneHandler } from '../../../../views/Action/helpers';

interface AddressFullProps {
  onDone?: OnDoneHandler;
  renderPartOf?: boolean;
}

const AddressFull: FC<AddressFullProps> = ({
  onDone,
  renderPartOf,
}) => {
  const [street] = useProperty(teamGL.street);

  return (
    <React.Fragment>
      {renderPartOf && (
        <Container>
          <Property label={schema.isPartOf} />
        </Container>
      )}
      <Property
        cancelPath={retrievePath((street?.value))}
        label={ontola.createAction}
        onDone={onDone}
      />
    </React.Fragment>
  );
};

AddressFull.type = teamGL.Address;

AddressFull.topology = [
  alertDialogTopology,
  fullResourceTopology,
];

export default register(AddressFull);

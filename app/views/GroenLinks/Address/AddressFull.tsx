import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { retrievePath } from '../../../helpers/iris';
import ontola from '../../../ontology/ontola';
import teamGL from '../../../ontology/teamGL';
import Container from '../../../topologies/Container';
import { alertDialogTopology } from '../../../topologies/Dialog';
import { fullResourceTopology } from '../../../topologies/FullResource';

interface AddressFullProps {
  renderPartOf?: boolean;
}

const AddressFull: FC<AddressFullProps> = ({
  renderPartOf,
}) => {
  const lrs = useLRS();
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
        responseCallback={lrs.actions.ontola.hideDialog}
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

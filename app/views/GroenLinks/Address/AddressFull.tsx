import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
  useLRS,
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
  street: SomeNode;
}

const AddressFull: FC<AddressFullProps> = ({
  renderPartOf,
  street,
}) => {
  const lrs = useLRS();

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

AddressFull.mapDataToProps = {
  street: teamGL.street,
};

export default register(AddressFull);

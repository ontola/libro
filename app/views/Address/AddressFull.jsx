import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { retrievePath } from '../../helpers/iris';
import ontola from '../../ontology/ontola';
import teamGL from '../../ontology/teamGL';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

const AddressFull = ({
  street,
}) => (
  <React.Fragment>
    <Container>
      <Property label={schema.isPartOf} />
    </Container>
    <Property cancelPath={retrievePath((street?.value))} label={ontola.createAction} />
  </React.Fragment>
);

AddressFull.type = teamGL.Address;

AddressFull.topology = fullResourceTopology;

AddressFull.mapDataToProps = {
  street: teamGL.street,
};

AddressFull.propTypes = {
  street: linkType,
};

export default register(AddressFull);

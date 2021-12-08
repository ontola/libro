import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

const FormFieldFull: FC = ({
  subject,
}) => (
  <Container>
    <Resource subject={subject} />
  </Container>
);

FormFieldFull.type = form.Field;

FormFieldFull.topology = fullResourceTopology;

export default register(FormFieldFull);

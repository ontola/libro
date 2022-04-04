import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { fullResourceTopology } from '../../topologies';
import Container from '../../topologies/Container';

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

import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

interface FormFieldFullProps {
  renderPartOf: boolean;
}

const FormFieldFull: FC<FormFieldFullProps> = ({
  renderPartOf,
  subject,
}) => (
  <Container>
    {renderPartOf && <Property label={schema.isPartOf} />}
    <Resource subject={subject} />
  </Container>
);

FormFieldFull.type = form.Field;

FormFieldFull.topology = fullResourceTopology;

export default register(FormFieldFull);

import {
  FC,
  Resource,
  register,
  useDataInvalidation,
} from 'link-redux';
import React from 'react';

import { UnwrappedForm } from '../../components/Form/Form';
import form from '../../ontology/form';
import { fullResourceTopology } from '../../topologies';
import MainBody from '../../topologies/MainBody';

const FormFieldFull: FC = ({
  subject,
}) => {
  const timestamp = useDataInvalidation(subject);

  return (
    <MainBody>
      <UnwrappedForm key={timestamp.toString()}>
        {() => <Resource subject={subject} />}
      </UnwrappedForm>
    </MainBody>
  );
};

FormFieldFull.type = form.Field;

FormFieldFull.topology = fullResourceTopology;

export default register(FormFieldFull);

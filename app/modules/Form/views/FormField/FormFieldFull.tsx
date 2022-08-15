import {
  FC,
  Resource,
  register,
  useDataInvalidation,
} from 'link-redux';
import React from 'react';

import { fullResourceTopology } from '../../../Common/topologies';
import MainBody from '../../../Common/topologies/MainBody';
import { UnwrappedForm } from '../../components/Form/Form';
import form from '../../ontology/form';

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

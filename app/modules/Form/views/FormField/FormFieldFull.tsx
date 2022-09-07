import {
  FC,
  Resource,
  register,
  useDataInvalidation,
} from 'link-redux';
import React from 'react';

import { fullResourceTopology } from '../../../Common/topologies';
import MainBody from '../../../Common/topologies/MainBody';
import Form from '../../components/Form/Form';
import form from '../../ontology/form';

const FormFieldFull: FC = ({
  subject,
}) => {
  const timestamp = useDataInvalidation(subject);

  return (
    <MainBody>
      <Form key={timestamp.toString()}>
        {() => <Resource subject={subject} />}
      </Form>
    </MainBody>
  );
};

FormFieldFull.type = form.Field;

FormFieldFull.topology = fullResourceTopology;

export default register(FormFieldFull);

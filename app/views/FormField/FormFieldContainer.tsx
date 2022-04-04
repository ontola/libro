import {
  FC,
  Property,
  Resource,
  register,
  useDataInvalidation,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import Form from '../../components/Form/Form';
import form from '../../ontology/form';
import ontola from '../../ontology/ontola';
import {
  alertDialogTopology,
  containerTopology,
  fullResourceTopology,
} from '../../topologies';
import { CardMain } from '../../topologies/Card';
import DetailsBar from '../../topologies/DetailsBar';

const FormFieldContainer: FC = ({
  subject,
}) => {
  const timestamp = useDataInvalidation(subject);

  return (
    <CardMain>
      <DetailsBar right={<Property label={ontola.actionsMenu} />} />
      <CardContent endSpacing>
        <Form key={timestamp.toString()}>
          {() => <Resource subject={subject} />}
        </Form>
      </CardContent>
    </CardMain>
  );
};

FormFieldContainer.type = form.Field;

FormFieldContainer.topology = [
  alertDialogTopology,
  fullResourceTopology,
  containerTopology,
];

export default register(FormFieldContainer);

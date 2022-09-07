import {
  FC,
  Property,
  Resource,
  register,
  useDataInvalidation,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import {
  alertDialogTopology,
  containerTopology,
  fullResourceTopology,
} from '../../../Common/topologies';
import { CardMain } from '../../../Common/topologies/Card';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import ontola from '../../../Kernel/ontology/ontola';
import Form from '../../components/Form/Form';
import form from '../../ontology/form';

const FormFieldContainer: FC = ({
  subject,
}) => {
  const timestamp = useDataInvalidation(subject);

  return (
    <CardMain>
      <CardContent endSpacing>
        <Form key={timestamp.toString()}>
          {() => <Resource subject={subject} />}
        </Form>
        <ContentDetails>
          <Property label={ontola.actionsMenu}>
            <Property label={ontola.menuItems} />
          </Property>
        </ContentDetails>
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

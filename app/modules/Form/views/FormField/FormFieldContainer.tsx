import {
  FC,
  Property,
  Resource,
  register,
  useDataInvalidation,
} from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import ontola from '../../../../ontology/ontola';
import {
  alertDialogTopology,
  containerTopology,
  fullResourceTopology,
} from '../../../../topologies';
import { CardMain } from '../../../../topologies/Card';
import ContentDetails from '../../../../topologies/ContentDetails';
import CardContent from '../../../Common/components/Card/CardContent';
import { UnwrappedForm } from '../../components/Form/Form';

const FormFieldContainer: FC = ({
  subject,
}) => {
  const timestamp = useDataInvalidation(subject);

  return (
    <CardMain>
      <CardContent endSpacing>
        <UnwrappedForm key={timestamp.toString()}>
          {() => <Resource subject={subject} />}
        </UnwrappedForm>
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

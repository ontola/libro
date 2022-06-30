import {
  FC,
  Property,
  Resource,
  register,
  useDataInvalidation,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import { CardMain } from '../../../Common/topologies/Card';
import { containerTopology } from '../../../Common/topologies/Container';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import { alertDialogTopology } from '../../../Common/topologies/Dialog';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import ontola from '../../../Core/ontology/ontola';
import { UnwrappedForm } from '../../components/Form/Form';
import form from '../../ontology/form';

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

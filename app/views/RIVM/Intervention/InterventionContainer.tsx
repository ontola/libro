import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import AttributeListItem from '../../../components/AttributeListItem';
import CardContent from '../../../components/Card/CardContent';
import LDLink from '../../../components/LDLink';
import argu from '../../../ontology/argu';
import dbo from '../../../ontology/dbo';
import meeting from '../../../ontology/meeting';
import rivm from '../../../ontology/rivm';
import { highlightContext } from '../../../state/highlight';
import ActionsBar from '../../../topologies/ActionsBar';
import AttributeList from '../../../topologies/AttributeList';
import Card from '../../../topologies/Card';
import CardRow from '../../../topologies/Card/CardRow';
import { containerTopology } from '../../../topologies/Container';
import { alertDialogTopology } from '../../../topologies/Dialog';
import { fullResourceTopology } from '../../../topologies/FullResource';

const InterventionContainer: FC = ({ subject }) => {
  const { highlightState } = React.useContext(highlightContext);

  return (
    <Card
      about={subject.value}
      shine={subject.value === highlightState}
    >
      <CardContent noSpacing>
        <Property label={[schema.name, rdfs.label]} />
        <Property label={[schema.text, schema.description, dbo.abstract]} />
        <AttributeList>
          <tr>
            <th>
              Praktische ervaring aandrager
            </th>
            <th>
              Beoordeling
            </th>
          </tr>
          <AttributeListItem
            label={rivm.securityImprovedScore}
            labelFrom={rivm.securityImproved}
          />
          <AttributeListItem
            label={rivm.oneOffCostsScore}
            labelFrom={rivm.oneOffCosts}
          />
          <AttributeListItem
            label={rivm.recurringCostsScore}
            labelFrom={rivm.recurringCosts}
          />
        </AttributeList>
      </CardContent>
      <CardRow>
        <Property label={[argu.attachments, meeting.attachment]} />
      </CardRow>
      <ActionsBar small>
        <LDLink>
          Lees meer
        </LDLink>
      </ActionsBar>
    </Card>
  );
};

InterventionContainer.type = rivm.Intervention;

InterventionContainer.topology = [
  alertDialogTopology,
  fullResourceTopology,
  containerTopology,
];

export default register(InterventionContainer);

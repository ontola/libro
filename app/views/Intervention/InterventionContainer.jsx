import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { AttributeListItem } from '../../components';
import CardContent from '../../components/Card/CardContent';
import LDLink from '../../components/LDLink';
import { connectHighlighting, hightlightType } from '../../containers/Highlight';
import { NS } from '../../helpers/LinkedRenderStore';
import meeting from '../../ontology/meeting';
import rivm from '../../ontology/rivm';
import ActionsBar from '../../topologies/ActionsBar';
import AttributeList from '../../topologies/AttributeList';
import Card from '../../topologies/Card';
import CardRow from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

const InterventionContainer = ({ highlighted, subject }) => (
  <Card about={subject?.value} shine={highlighted}>
    <CardContent noSpacing>
      <Property label={[schema.name, rdfs.label]} />
      <Property label={[schema.text, schema.description, NS.dbo('abstract')]} />
      <AttributeList>
        <tr><th>Praktische ervaring</th><th>Aandrager</th></tr>
        <AttributeListItem label={rivm.securityImprovedScore} />
        <AttributeListItem label={rivm.oneOffCostsScore} />
        <AttributeListItem label={rivm.recurringCostsScore} />
      </AttributeList>
    </CardContent>
    <CardRow noBorder>
      <Property label={[NS.argu('attachments'), meeting.attachment]} />
    </CardRow>
    <ActionsBar small>
      <LDLink>Lees meer</LDLink>
    </ActionsBar>
  </Card>
);

InterventionContainer.type = rivm.Intervention;

InterventionContainer.topology = [
  alertDialogTopology,
  primaryResourceTopology,
  containerTopology,
  widgetTopologyTopology,
];

InterventionContainer.hocs = [connectHighlighting];

InterventionContainer.propTypes = {
  highlighted: hightlightType,
  subject: subjectType,
};

export default register(InterventionContainer);

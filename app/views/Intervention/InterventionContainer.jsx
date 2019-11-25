import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { connectHighlighting, hightlightType } from '../../containers/Highlight';
import SignInSwitcherContainer from '../../containers/SignInSwitcherContainer';
import { NS } from '../../helpers/LinkedRenderStore';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';
import AttributeList from '../../topologies/AttributeList';
import { AttributeListItem } from '../../components';

const InterventionContainer = ({ highlighted, subject }) => (
  <Card about={subject?.value} shine={highlighted}>
    <CardContent noSpacing>
      <Property label={[schema.name, rdfs.label]} />
      <Property label={[schema.text, schema.description, NS.dbo('abstract')]} />
      <AttributeList>
        <tr><th>Praktische ervaring</th><th>Aandrager</th></tr>
        <AttributeListItem label={NS.rivm('securityImprovedScore')} />
        <AttributeListItem label={NS.rivm('oneOffCostsScore')} />
        <AttributeListItem label={NS.rivm('recurringCostsScore')} />
      </AttributeList>
      <Property label={[NS.argu('attachments'), NS.meeting('attachment')]} />
    </CardContent>
    <CardAppendix>
      <SignInSwitcherContainer subject={subject}>
        <Property label={NS.argu('topComment')} />
        <Property forceRender label={NS.app('omniform')} />
      </SignInSwitcherContainer>
    </CardAppendix>
  </Card>
);

InterventionContainer.type = NS.rivm('Intervention');

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

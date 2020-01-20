import foaf from '@ontologies/foaf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import Collection from '../../components/Collection';
import { NS } from '../../helpers/LinkedRenderStore';
import argu from '../../ontology/argu';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import rivm from '../../ontology/rivm';
import Card from '../../topologies/Card';
import CardRow from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

const RiskContainer = ({ subject }) => (
  <Card about={subject?.value}>
    <Property label={ontola.coverPhoto} />
    <CardContent noSpacing>
      <Property label={[schema.name, rdfs.label, foaf.name]} />
      <Property label={[schema.text, schema.description, NS.dbo('abstract')]} />
      <Collection display="table" label={rivm.incidents} />
    </CardContent>
    <CardRow noBorder>
      <Property label={[argu.attachments, meeting.attachment]} />
    </CardRow>
  </Card>
);

RiskContainer.type = rivm.Risk;

RiskContainer.topology = [
  alertDialogTopology,
  primaryResourceTopology,
  containerTopology,
  widgetTopologyTopology,
];

RiskContainer.propTypes = {
  subject: subjectType,
};

export default register(RiskContainer);
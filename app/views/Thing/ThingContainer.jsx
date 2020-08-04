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
import { connectHighlighting, hightlightType } from '../../containers/Highlight';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import Card from '../../topologies/Card';
import CardRow from '../../topologies/Card/CardRow';
import CardAppendix from '../../topologies/Card/CardAppendix';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { fullResourceTopology } from '../../topologies/FullResource';

const ThingContainer = ({ highlighted, subject }) => (
  <Card about={subject?.value} shine={highlighted}>
    <Property label={ontola.coverPhoto} />
    <CardContent noSpacing>
      <Property label={[schema.name, rdfs.label, foaf.name]} />
      <Property label={[schema.text, schema.description, dbo.abstract]} />
    </CardContent>
    <CardRow noBorder>
      <Property label={[argu.attachments, meeting.attachment]} />
    </CardRow>
    <CardAppendix>
      <Property label={argu.topComment} />
    </CardAppendix>
  </Card>
);

ThingContainer.type = schema.Thing;

ThingContainer.topology = [
  alertDialogTopology,
  fullResourceTopology,
  containerTopology,
];

ThingContainer.hocs = [connectHighlighting];

ThingContainer.propTypes = {
  highlighted: hightlightType,
  subject: subjectType,
};

export default register(ThingContainer);

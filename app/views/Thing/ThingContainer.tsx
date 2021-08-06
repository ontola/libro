import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { connectHighlighting } from '../../containers/Highlight';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardRow from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { fullResourceTopology } from '../../topologies/FullResource';

interface ThingContainerProps {
  highlighted: boolean;
  subject: SomeNode;
}

const ThingContainer: FC<ThingContainerProps> = ({ highlighted, subject }) => (
  <Card
    about={subject?.value}
    shine={highlighted}
  >
    <Property label={ontola.coverPhoto} />
    <CardContent noSpacing>
      <Property label={[schema.name, rdfs.label, foaf.name]} />
      <Property label={[schema.text, schema.description, dbo.abstract]} />
    </CardContent>
    <CardRow>
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

export default register(ThingContainer);

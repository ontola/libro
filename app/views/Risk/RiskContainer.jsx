import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import Collection from '../../components/Collection';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import rivm from '../../ontology/rivm';
import Card from '../../topologies/Card';
import CardRow from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { fullResourceTopology } from '../../topologies/FullResource';

const RiskContainer = ({ subject }) => (
  <Card about={subject?.value}>
    <Property label={ontola.coverPhoto} />
    <CardContent noSpacing>
      <Property label={[schema.name, rdfs.label, foaf.name]} />
      <Property label={[schema.text, schema.description, dbo.abstract]} />
      <Collection display="table" label={rivm.incidents} />
    </CardContent>
    <CardRow>
      <Property label={[argu.attachments, meeting.attachment]} />
    </CardRow>
  </Card>
);

RiskContainer.type = rivm.Risk;

RiskContainer.topology = [
  alertDialogTopology,
  fullResourceTopology,
  containerTopology,
];

RiskContainer.propTypes = {
  subject: subjectType,
};

export default register(RiskContainer);

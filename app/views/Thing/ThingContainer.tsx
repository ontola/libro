import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import { highlightContext } from '../../state/highlight';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardRow from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';

const ThingContainer: FC = ({ subject }) => {
  const { highlightState } = React.useContext(highlightContext);

  return (
    <Card
      about={subject.value}
      shine={subject.value === highlightState}
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
};

ThingContainer.type = schema.Thing;

ThingContainer.topology = containerTopology;

export default register(ThingContainer);

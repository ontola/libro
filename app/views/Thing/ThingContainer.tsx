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
import HeadingContext from '../../components/Heading/HeadingContext';
import { useHighlight } from '../../components/HighlightProvider';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import { containerTopology } from '../../topologies';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardRow from '../../topologies/Card/CardRow';

const ThingContainer: FC = ({ subject }) => {
  const { highlightState } = useHighlight();

  return (
    <Card
      about={subject.value}
      shine={subject.value === highlightState}
    >
      <HeadingContext>
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
      </HeadingContext>
    </Card>
  );
};

ThingContainer.type = schema.Thing;

ThingContainer.topology = containerTopology;

export default register(ThingContainer);

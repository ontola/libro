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
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import opengov from '../../ontology/opengov';
import { highlightContext } from '../../state/highlight';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardRow from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { fullResourceTopology } from '../../topologies/FullResource';

const MotionContainer: FC = ({ subject }) => {
  const { highlightState } = React.useContext(highlightContext);

  return (
    <Card
      about={subject.value}
      shine={subject.value === highlightState}
    >
      <HeadingContext>
        <Property label={ontola.coverPhoto} />
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label]} />
          <Property label={[schema.text, schema.description, dbo.abstract]} />
        </CardContent>
        <CardRow>
          <Property label={[argu.attachments, meeting.attachment]} />
        </CardRow>
        <Property label={argu.voteableVoteEvent} />
        <CardAppendix>
          <Property
            forceRender
            label={argu.arguments}
          />
          <Property label={argu.topComment} />
          <Property
            forceRender
            label={app.omniform}
          />
        </CardAppendix>
      </HeadingContext>
    </Card>
  );
};

MotionContainer.type = [argu.Motion, opengov.Motion];

MotionContainer.topology = [
  alertDialogTopology,
  fullResourceTopology,
  containerTopology,
];

export default register(MotionContainer);

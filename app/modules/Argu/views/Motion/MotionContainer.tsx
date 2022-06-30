import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import dbo from '../../../../ontology/dbo';
import meeting from '../../../../ontology/meeting';
import opengov from '../../../../ontology/opengov';
import CardContent from '../../../Common/components/Card/CardContent';
import HeadingContext from '../../../Common/components/Heading/HeadingContext';
import Card from '../../../Common/topologies/Card';
import CardAppendix from '../../../Common/topologies/Card/CardAppendix';
import CardRow from '../../../Common/topologies/Card/CardRow';
import { containerTopology } from '../../../Common/topologies/Container';
import { alertDialogTopology } from '../../../Common/topologies/Dialog';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import { useHighlight } from '../../../Core/components/HighlightProvider/HighlightProvider';
import app from '../../../Core/ontology/app';
import ontola from '../../../Core/ontology/ontola';
import argu from '../../lib/argu';

const MotionContainer: FC = ({ subject }) => {
  const { highlightState } = useHighlight();

  return (
    <Card shine={subject.value === highlightState}>
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

import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import dbo from '../../../Common/ontology/dbo';
import meeting from '../../../../ontology/meeting';
import opengov from '../../../../ontology/opengov';
import CardContent from '../../../Common/components/Card/CardContent';
import HeadingContext from '../../../Common/components/Heading/HeadingContext';
import {
  alertDialogTopology,
  containerTopology,
  fullResourceTopology,
} from '../../../Common/topologies';
import Card from '../../../Common/topologies/Card';
import CardAppendix from '../../../Common/topologies/Card/CardAppendix';
import CardRow from '../../../Common/topologies/Card/CardRow';
import { useHighlight } from '../../../Common/components/HighlightProvider/HighlightProvider';
import app from '../../../Common/ontology/app';
import ontola from '../../../Kernel/ontology/ontola';
import argu from '../../ontology/argu';

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

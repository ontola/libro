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
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import opengov from '../../ontology/opengov';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardRow from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { fullResourceTopology } from '../../topologies/FullResource';

const MotionContainer = ({ highlighted, subject }) => (
  <Card about={subject?.value} shine={highlighted}>
    <Property label={ontola.coverPhoto} />
    <CardContent noSpacing>
      <Property label={[schema.name, rdfs.label]} />
      <Property label={[schema.text, schema.description, dbo.abstract]} />
    </CardContent>
    <CardRow noBorder>
      <Property label={[argu.attachments, meeting.attachment]} />
    </CardRow>
    <Property label={argu.voteableVoteEvent} />
    <CardAppendix>
      <SignInSwitcherContainer subject={subject}>
        <Property forceRender label={argu.arguments} />
        <Property label={argu.topComment} />
        <Property forceRender label={app.omniform} />
      </SignInSwitcherContainer>
    </CardAppendix>
  </Card>
);

MotionContainer.type = [argu.Motion, opengov.Motion];

MotionContainer.topology = [
  alertDialogTopology,
  fullResourceTopology,
  containerTopology,
];

MotionContainer.hocs = [connectHighlighting];

MotionContainer.propTypes = {
  highlighted: hightlightType,
  subject: subjectType,
};

export default register(MotionContainer);

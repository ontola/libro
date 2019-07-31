import {
  Property,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { connectHighlighting, hightlightType } from '../../containers/Highlight';
import SignInSwitcherContainer from '../../containers/SignInSwitcherContainer';
import { NS } from '../../helpers/LinkedRenderStore';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

const ThingContainer = ({ highlighted, subject }) => (
  <Card about={subject?.value} shine={highlighted}>
    <Property label={NS.argu('coverPhoto')} />
    <CardContent noSpacing>
      <Property label={[NS.schema('name'), NS.rdfs('label')]} />
      <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
      <Property label={[NS.argu('attachments'), NS.meeting('attachment')]} />
    </CardContent>
    <Property label={NS.argu('voteableVoteEvent')} />
    <CardAppendix>
      <SignInSwitcherContainer subject={subject}>
        <Property forceRender label={NS.argu('arguments')} />
        <Property label={NS.argu('topComment')} />
        <Property forceRender label={NS.app('omniform')} />
      </SignInSwitcherContainer>
    </CardAppendix>
  </Card>
);

ThingContainer.type = NS.schema('Thing');

ThingContainer.topology = [
  alertDialogTopology,
  primaryResourceTopology,
  containerTopology,
  widgetTopologyTopology,
];

ThingContainer.hocs = [connectHighlighting];

ThingContainer.propTypes = {
  highlighted: hightlightType,
  subject: subjectType,
};

export default register(ThingContainer);

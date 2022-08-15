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
import wdt from '../../../Common/ontology/wdt';
import { PageHeader } from '../../../Common/components/PageHeader';
import SubSection from '../../../Common/components/SubSection';
import { fullResourceTopology } from '../../../Common/topologies';
import MainBody from '../../../Common/topologies/MainBody';
import { LoadingHidden } from '../../../Common/components/Loading';
import ontola from '../../../Kernel/ontology/ontola';
import argu from '../../ontology/argu';

const MotionFull: FC = () => (
  <React.Fragment>
    <MainBody>
      <Property label={argu.trashedAt} />
      <Property
        label={ontola.publishAction}
        onLoad={LoadingHidden}
      />
      <PageHeader />
      <Property label={[dbo.thumbnail, wdt.ns('P18')]} />
      <Property label={[schema.text, schema.description, dbo.abstract]} />
      <Property
        label={[argu.attachments, meeting.attachment]}
        onLoad={LoadingHidden}
      />
      <Property
        label={argu.voteableVoteEvent}
        onLoad={LoadingHidden}
      />
      <Property
        gutterTop
        label={schema.location}
      />
      <Property label={argu.blogPosts} />
    </MainBody>
    <SubSection />
  </React.Fragment>
);

MotionFull.type = [argu.Motion, opengov.Motion];

MotionFull.topology = fullResourceTopology;

export default register(MotionFull);

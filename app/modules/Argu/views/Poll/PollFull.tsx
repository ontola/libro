import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register, 
} from 'link-redux';
import React from 'react';

import { LoadingHidden } from '../../../Common/components/Loading';
import { PageHeader } from '../../../Common/components/PageHeader';
import SubSection from '../../../Common/components/SubSection';
import dbo from '../../../Common/ontology/dbo';
import { fullResourceTopology } from '../../../Common/topologies';
import List from '../../../Common/topologies/List';
import MainBody from '../../../Common/topologies/MainBody';
import ontola from '../../../Kernel/ontology/ontola';
import argu from '../../ontology/argu';

const PollFull: FC = () => (
  <React.Fragment>
    <MainBody>
      <Property label={argu.trashedAt} />
      <Property
        label={ontola.publishAction}
        onLoad={LoadingHidden}
      />
      <PageHeader />
      <Property label={[schema.text, schema.description, dbo.abstract]} />
      <List wrap>
        <Property
          label={argu.attachments}
          onLoad={LoadingHidden}
        />
      </List>
      <Property label={argu.voteOptions} />
      <Property
        gutterTop
        label={schema.location}
      />
      <Property label={argu.blogPosts} />
      <Property
        forceRender
        label={argu.signInFlow}
      />
    </MainBody>
    <SubSection />
  </React.Fragment>
);

PollFull.type = argu.Poll;

PollFull.topology = fullResourceTopology;

export default register(PollFull);

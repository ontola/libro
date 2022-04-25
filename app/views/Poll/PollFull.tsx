import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { LoadingHidden } from '../../components/Loading';
import { PageHeader } from '../../components/PageHeader';
import SubSection from '../../components/SubSection';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import { fullResourceTopology } from '../../topologies';
import List from '../../topologies/List';
import MainBody from '../../topologies/MainBody';

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
        <Property
          label={meeting.attachment}
          onLoad={LoadingHidden}
        />
      </List>
      <Property label={argu.voteOptions} />
      <Property
        gutterTop
        label={schema.location}
      />
      <Property label={argu.blogPosts} />
    </MainBody>
    <SubSection />
  </React.Fragment>
);

PollFull.type = argu.Poll;

PollFull.topology = fullResourceTopology;

export default register(PollFull);

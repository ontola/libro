import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import Collection from '../../components/Collection';
import { PageHeader } from '../../components/PageHeader';
import SubSection from '../../components/SubSection';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import opengov from '../../ontology/opengov';
import wdt from '../../ontology/wdt';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import List from '../../topologies/List';
import MainBody from '../../topologies/MainBody';

const MotionFull: FC = () => (
  <React.Fragment>
    <Container>
      <Property label={argu.trashedAt} />
      <Property
        label={ontola.publishAction}
        onLoad={() => null}
      />
      <PageHeader />
      <MainBody>
        <Property label={[dbo.thumbnail, wdt.ns('P18')]} />
        <Property label={[schema.text, schema.description, dbo.abstract]} />
        <List wrap>
          <Property
            label={argu.attachments}
            onLoad={() => null}
          />
          <Property
            label={meeting.attachment}
            onLoad={() => null}
          />
        </List>
        <Collection
          hideHeader
          label={argu.blogPosts}
          pageSize={1}
          onLoad={() => null}
        />
        <Property
          label={argu.voteableVoteEvent}
          onLoad={() => null}
        />
      </MainBody>
    </Container>
    <SubSection />
  </React.Fragment>
);

MotionFull.type = [argu.Motion, opengov.Motion];

MotionFull.topology = fullResourceTopology;

export default register(MotionFull);

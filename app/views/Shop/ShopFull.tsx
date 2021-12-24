import * as foaf from '@ontologies/foaf';
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
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import ActionsBar from '../../topologies/ActionsBar';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import List from '../../topologies/List';
import MainBody from '../../topologies/MainBody';
import { tabPaneTopology } from '../../topologies/TabPane';

const ShopFull: FC = (): JSX.Element => (
  <React.Fragment>
    <Container>
      <Property
        label={ontola.publishAction}
        onLoad={LoadingHidden}
      />
    </Container>
    <MainBody data-test="Thing-thing">
      <Property label={argu.trashedAt} />
      <PageHeader />
      <Property label={[schema.text, schema.description, dbo.abstract]} />
      <Property label={app.contents} />
      <Property label={foaf.isPrimaryTopicOf} />
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
      <ActionsBar>
        <Property label={ontola.favoriteAction} />
      </ActionsBar>
      <Property
        withoutLoading
        label={schema.location}
      />
    </MainBody>
    <SubSection />
    <Property label={argu.cart} />
  </React.Fragment>
);

ShopFull.type = argu.Shop;

ShopFull.topology = [
  fullResourceTopology,
  tabPaneTopology,
];

export default register(ShopFull);
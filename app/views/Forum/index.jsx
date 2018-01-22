import LinkedRenderStore from 'link-lib';
import React from 'react';
import { Property } from 'link-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import { PageHeader } from '../../components';
import Container from '../../components/Container/index';

const ForumPage = () => (
  <div>
    <PageHeader>
      <Property label={NS.schema('name')} />
      <Property label={[NS.schema('description'), NS.rdfs('label')]} />
    </PageHeader>
    <Container grid>
      <Property label={NS.argu('widgets')} />
    </Container>
    <Property label={NS.argu('voteMatches')} />
  </div>
);

export default LinkedRenderStore.registerRenderer(
  ForumPage,
  [
    NS.argu('Forum'),
    NS.argu('Page'),
  ]
);

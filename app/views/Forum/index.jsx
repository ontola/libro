import LinkedRenderStore from 'link-lib';
import React from 'react';
import { Property } from 'link-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import { PageHeader } from '../../components';

const ForumPage = () => (
  <div>
    <PageHeader>
      <Property label={NS.schema('name')} />
      <Property label={[NS.schema('description'), NS.rdfs('label')]} />
      <Property label={NS.argu('followMenu')} />
      <Property label={NS.argu('actionsMenu')} />
    </PageHeader>
    <Property label={NS.argu('widgets')} />
  </div>
);

export default LinkedRenderStore.registerRenderer(
  ForumPage,
  [
    NS.argu('Forum'),
    NS.argu('Page'),
  ]
);

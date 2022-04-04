import * as schema from '@ontologies/schema';
import { Resource, register } from 'link-redux';
import React from 'react';

import Metadata from '../../components/Metadata';
import argu from '../../ontology/argu';
import { pageTopology } from '../../topologies';
import FullResource from '../../topologies/FullResource';

const ForumPage = (props: any): JSX.Element => (
  <React.Fragment>
    <Metadata />
    <FullResource>
      <main role="main">
        <Resource {...props} />
      </main>
    </FullResource>
  </React.Fragment>
);

ForumPage.type = [argu.ContainerNode, schema.WebPage];

ForumPage.topology = pageTopology;

export default register(ForumPage);

import * as schema from '@ontologies/schema';
import { Resource, register } from 'link-redux';
import React from 'react';

import Metadata from '../../../Common/components/Metadata';
import { pageTopology } from '../../../Common/topologies';
import FullResource from '../../../Common/topologies/FullResource';
import argu from '../../ontology/argu';

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

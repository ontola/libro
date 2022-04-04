import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import HeadingContext from '../../components/Heading/HeadingContext';
import Metadata from '../../components/Metadata';
import { pageTopology } from '../../topologies';
import FullResource from '../../topologies/FullResource';

const ThingPage = (props: any): JSX.Element => (
  <HeadingContext>
    <Metadata />
    <FullResource>
      <main role="main">
        <Property label={schema.isPartOf} />
        <Resource {...props} />
      </main>
    </FullResource>
  </HeadingContext>
);

ThingPage.type = schema.Thing;

ThingPage.topology = pageTopology;

export default register(ThingPage);

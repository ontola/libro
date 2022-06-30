import * as as from '@ontologies/as';
import { DEFAULT_TOPOLOGY } from 'link-lib';
import { Property, register } from 'link-redux';
import React from 'react';

import HeadingContext from '../../../Common/components/Heading/HeadingContext';
import Card from '../../../Common/topologies/Card';
import Suspense from '../../../Core/components/Suspense';
import libro from '../../../Core/ontology/libro';
import argu from '../../lib/argu';

import ActivityDetailsBar from './properties/ActivityDetailsBar';

const PublishActivityContainer = () => (
  <Suspense>
    <HeadingContext>
      <Card>
        <ActivityDetailsBar />
        <Property label={as.object} />
      </Card>
    </HeadingContext>
  </Suspense>
);

PublishActivityContainer.type = argu.PublishActivity;

PublishActivityContainer.topology = [
  DEFAULT_TOPOLOGY,
  libro.topologies.container,
];

export default register(PublishActivityContainer);

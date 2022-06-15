import * as as from '@ontologies/as';
import { DEFAULT_TOPOLOGY } from 'link-lib';
import { Property, register } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import Card from '../../../../topologies/Card';
import HeadingContext from '../../../Common/components/Heading/HeadingContext';
import Suspense from '../../../Core/components/Suspense';

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
  argu.container,
];

export default register(PublishActivityContainer);

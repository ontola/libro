import as from '@ontologies/as';
import { Property, register } from 'link-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';

import Suspense from '../../components/Suspense';
import argu from '../../ontology/argu';
import Card from '../../topologies/Card';

import ActivityDetailsBar from './properties/ActivityDetailsBar';

const PublishActivityContainer = () => (
  <Suspense>
    <Card>
      <ActivityDetailsBar />
      <Property label={as.object} />
    </Card>
  </Suspense>
);

PublishActivityContainer.type = argu.PublishActivity;

PublishActivityContainer.topology = [
  undefined,
  argu.container,
];

PublishActivityContainer.hocs = [withRouter];

export default register(PublishActivityContainer);

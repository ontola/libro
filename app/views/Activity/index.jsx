import as from '@ontologies/as';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { LoadingCard, SuspendedLoader } from '../../components/Loading';
import argu from '../../ontology/argu';
import Card from '../../topologies/Card';
import DetailsBar from '../../topologies/DetailsBar';
import { defaultMenus } from '../common';

import ActivityName from './properties/name';

import './Activity.scss';

const Activity = () => (
  <React.Suspense fallback={<LoadingCard />}>
    <Card>
      <DetailsBar
        className="ActivityDetail"
        right={(
          <React.Fragment>
            <Property label={schema.dateCreated} />
            <Property label={as.object} onLoad={SuspendedLoader}>
              {defaultMenus}
            </Property>
          </React.Fragment>
        )}
      >
        <Property label={schema.name} />
      </DetailsBar>
      <Property label={as.object} />
    </Card>
  </React.Suspense>
);

Activity.type = as.Activity;

Activity.topology = [
  undefined,
  argu.container,
];

Activity.hocs = [withRouter];

export default [
  register(Activity),
  ActivityName,
];

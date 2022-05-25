import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import { DEFAULT_TOPOLOGY } from 'link-lib';
import { Property, register } from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { LoadingHidden } from '../../components/Loading';
import OmniformTrigger from '../../components/Omniform/OmniformTrigger';
import Suspense from '../../components/Suspense';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import ActionsBar from '../../topologies/ActionsBar';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';

import ActivityDetailsBar from './properties/ActivityDetailsBar';

const PublishActivityContainer = () => (
  <Suspense>
    <Card>
      <Property label={as.object}>
        <Property label={ontola.coverPhoto} />
      </Property>
      <CardContent>
        <ActivityDetailsBar />
      </CardContent>
      <Property label={as.object} />
      <CardContent endSpacing>
        <Property label={as.object}>
          <ActionsBar small>
            <Property
              label={schema.comment}
              onLoad={LoadingHidden}
            >
              <OmniformTrigger />
            </Property>
          </ActionsBar>
        </Property>
      </CardContent>
      <Property label={as.object}>
        <CardAppendix>
          <Property
            forceRender
            clickToOpen={false}
            label={app.omniform}
          />
        </CardAppendix>
      </Property>
    </Card>
  </Suspense>
);

PublishActivityContainer.type = argu.PublishActivity;

PublishActivityContainer.topology = [
  DEFAULT_TOPOLOGY,
  argu.container,
];

export default register(PublishActivityContainer);

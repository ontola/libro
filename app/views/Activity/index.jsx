import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Card,
  CardContent,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import DetailsBar from '../../topologies/DetailsBar';

import ActivityName from './properties/name';

const Activity = () => (
  <Card>
    <CardContent>
      <DetailsBar
        right={<Property label={NS.schema('dateCreated')} />}
      >
        <Property label={NS.schema('name')} />
      </DetailsBar>
    </CardContent>
    <Property label={NS.as('object')} />
  </Card>
);

const ConnectedActivity = withRouter(Activity);

export default [
  LinkedRenderStore.registerRenderer(
    ConnectedActivity,
    NS.as('Activity'),
    RENDER_CLASS_NAME,
    [
      undefined,
      NS.argu('container'),
    ]
  ),
  ActivityName,
];

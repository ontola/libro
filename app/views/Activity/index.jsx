import { Property, register } from 'link-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Card,
  CardContent,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import DetailsBar from '../../topologies/DetailsBar';

import ActivityName from './properties/name';

class Activity extends React.PureComponent {
  static type = NS.as('Activity');

  static topology = [
    undefined,
    NS.argu('container'),
  ];

  static hocs = [withRouter];

  render() {
    return (
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
  }
}

export default [
  register(Activity),
  ActivityName,
];

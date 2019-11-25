import as from '@ontologies/as';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { NS } from '../../helpers/LinkedRenderStore';
import ontola from '../../ontology/ontola';
import Card from '../../topologies/Card';
import DetailsBar from '../../topologies/DetailsBar';

import ActivityName from './properties/name';

import './Activity.scss';

class Activity extends React.PureComponent {
  static type = as.Activity;

  static topology = [
    undefined,
    NS.argu('container'),
  ];

  static hocs = [withRouter];

  render() {
    return (
      <Card>
        <DetailsBar
          className="ActivityDetail"
          right={(
            <React.Fragment>
              <Property label={schema.dateCreated} />
              <Property label={as.object}>
                <Property label={ontola.followMenu} />
                <Property label={ontola.shareMenu} />
                <Property label={ontola.actionsMenu} />
              </Property>
            </React.Fragment>
          )}
        >
          <Property label={schema.name} />
        </DetailsBar>
        <Property label={as.object} />
      </Card>
    );
  }
}

export default [
  register(Activity),
  ActivityName,
];

import as from '@ontologies/as';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { LoadingCard, SuspendedLoader } from '../../components/Loading';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Card from '../../topologies/Card';
import DetailsBar from '../../topologies/DetailsBar';

import ActivityName from './properties/name';

import './Activity.scss';

class Activity extends React.PureComponent {
  static type = as.Activity;

  static topology = [
    undefined,
    argu.container,
  ];

  static hocs = [withRouter];

  render() {
    return (
      <React.Suspense fallback={<LoadingCard />}>
        <Card>
          <DetailsBar
            className="ActivityDetail"
            right={(
              <React.Fragment>
                <Property label={schema.dateCreated} />
                <Property label={as.object} onLoad={SuspendedLoader}>
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
      </React.Suspense>
    );
  }
}

export default [
  register(Activity),
  ActivityName,
];

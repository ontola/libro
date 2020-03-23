import as from '@ontologies/as';
import schema from '@ontologies/schema';
import { linkType, register } from 'link-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { LoadingCard } from '../../components/Loading';
import argu from '../../ontology/argu';
import Card, { CardContent, CardRow } from '../../topologies/Card';

import ActivityDetailsBar from './properties/ActivityDetailsBar';

const ActivityContainer = ({ text }) => (
  <React.Suspense fallback={<LoadingCard />}>
    <Card>
      <ActivityDetailsBar />
      {text && (
        <CardRow>
          <CardContent>
            <p>{text.value}</p>
          </CardContent>
        </CardRow>
      )}
    </Card>
  </React.Suspense>
);

ActivityContainer.type = as.Activity;

ActivityContainer.topology = [
  undefined,
  argu.container,
];

ActivityContainer.hocs = [withRouter];

ActivityContainer.mapDataToProps = {
  name: schema.name,
  text: schema.text,
};

ActivityContainer.propTypes = {
  text: linkType,
};

export default register(ActivityContainer);
import as from '@ontologies/as';
import schema from '@ontologies/schema';
import { linkType, register } from 'link-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';

import CardContent from '../../components/Card/CardContent';
import Suspense from '../../components/Suspense';
import argu from '../../ontology/argu';
import Card, { CardRow } from '../../topologies/Card';

import ActivityDetailsBar from './properties/ActivityDetailsBar';

const ActivityContainer = ({ text }) => (
  <Suspense>
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
  </Suspense>
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

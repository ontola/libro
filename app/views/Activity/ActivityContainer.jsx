import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import {
  linkType,
  register,
  useProperty 
} from 'link-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';

import CardContent from '../../components/Card/CardContent';
import Suspense from '../../components/Suspense';
import argu from '../../ontology/argu';
import Card, { CardRow } from '../../topologies/Card';

import ActivityDetailsBar from './properties/ActivityDetailsBar';

const ActivityContainer = () => {
  const [text] = useProperty(schema.text);

  return(
    <Suspense>
      <Card>
        <ActivityDetailsBar />
        {text && (
          <CardRow>
            <CardContent>
              <p>
                {text.value}
              </p>
            </CardContent>
          </CardRow>
        )}
      </Card>
    </Suspense>
  );
};

ActivityContainer.type = as.Activity;

ActivityContainer.topology = [
  undefined,
  argu.container,
];

ActivityContainer.hocs = [withRouter];

ActivityContainer.propTypes = {
  text: linkType,
};

export default register(ActivityContainer);

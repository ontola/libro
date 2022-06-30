import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import { DEFAULT_TOPOLOGY } from 'link-lib';
import { register, useStrings } from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import Card, { CardRow } from '../../../Common/topologies/Card';
import Suspense from '../../../Core/components/Suspense';
import libro from '../../../Core/ontology/libro';

import ActivityDetailsBar from './properties/ActivityDetailsBar';

const ActivityContainer = (): JSX.Element => {
  const [text] = useStrings(schema.text);

  return (
    <Suspense>
      <Card>
        <ActivityDetailsBar />
        {text && (
          <CardRow>
            <CardContent>
              <p>
                {text}
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
  DEFAULT_TOPOLOGY,
  libro.topologies.container,
];

export default register(ActivityContainer);

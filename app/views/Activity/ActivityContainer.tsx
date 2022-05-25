import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import { DEFAULT_TOPOLOGY } from 'link-lib';
import {
  Property,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import Suspense from '../../components/Suspense';
import argu from '../../ontology/argu';
import Card, { CardRow } from '../../topologies/Card';

import ActivityDetailsBar from './properties/ActivityDetailsBar';

const ActivityContainer = (): JSX.Element => {
  const [text] = useStrings(schema.text);

  return(
    <Suspense>
      <Property label={schema.name} />
      {text && (
        <Card>
          <ActivityDetailsBar inlineDetails />
          <CardRow>
            <CardContent>
              <p>
                {text}
              </p>
            </CardContent>
          </CardRow>
        </Card>
      )}
    </Suspense>
  );
};

ActivityContainer.type = as.Activity;

ActivityContainer.topology = [
  DEFAULT_TOPOLOGY,
  argu.container,
];

export default register(ActivityContainer);

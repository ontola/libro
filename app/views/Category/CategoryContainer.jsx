import * as schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import rivm from '../../ontology/rivm';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { fullResourceTopology } from '../../topologies/FullResource';
import CardContent from '../../components/Card/CardContent';
import Card from '../../topologies/Card';

const CategoryContainer = () => (
  <Card>
    <CardContent noSpacing>
      <Property label={schema.name} />
      <Property noSpacing label={schema.text} />
      <Property renderWhenEmpty label={rivm.measureTypes} />
    </CardContent>
  </Card>
);

CategoryContainer.type = rivm.Category;

CategoryContainer.topology = [
  alertDialogTopology,
  fullResourceTopology,
  containerTopology,
];

export default register(CategoryContainer);

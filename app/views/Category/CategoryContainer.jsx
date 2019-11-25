import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import rivm from '../../ontology/rivm';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

const CategoryContainer = () => (
  <Property renderWhenEmpty label={rivm.measureTypes} />
);

CategoryContainer.type = rivm.Category;

CategoryContainer.topology = [
  alertDialogTopology,
  primaryResourceTopology,
  containerTopology,
  widgetTopologyTopology,
];

export default register(CategoryContainer);

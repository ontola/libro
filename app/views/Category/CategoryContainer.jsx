import schema from '@ontologies/schema';
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
import ContainerHeader from '../../components/Container/ContainerHeader';

const CategoryContainer = () => (
  <React.Fragment>
    <ContainerHeader header={<Property label={schema.name} />} />
    <Property noSpacing label={schema.text} />
    <Property hideHeader renderWhenEmpty label={rivm.measureTypes} />
  </React.Fragment>
);

CategoryContainer.type = rivm.Category;

CategoryContainer.topology = [
  alertDialogTopology,
  primaryResourceTopology,
  containerTopology,
  widgetTopologyTopology,
];

export default register(CategoryContainer);

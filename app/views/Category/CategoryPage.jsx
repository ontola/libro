import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import rivm from '../../ontology/rivm';
import Container from '../../topologies/Container';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';

const CategoryContainer = () => (
  <PrimaryResource>
    <Container>
      <Property renderWhenEmpty label={rivm.measureTypes} />
    </Container>
  </PrimaryResource>
);

CategoryContainer.type = rivm.Category;

CategoryContainer.topology = pageTopology;

export default register(CategoryContainer);

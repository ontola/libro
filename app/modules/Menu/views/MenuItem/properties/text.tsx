import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../../../../ontology/ontola';
import { tabPaneTopology } from '../../../../../topologies';
import { LargeContainer } from '../../../../../topologies/Container';

const Text: FC<PropertyProps> = ({
  linkedProp,
}) => (
  <LargeContainer>
    {linkedProp.value}
  </LargeContainer>
);

Text.type = ontola.MenuItem;

Text.property = schema.text;

Text.topology = tabPaneTopology;

export default register(Text);

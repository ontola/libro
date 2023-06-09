import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import { tabPaneTopology } from '../../../../Common/topologies';
import { LargeContainer } from '../../../../Common/topologies/Container';
import ontola from '../../../../Kernel/ontology/ontola';

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

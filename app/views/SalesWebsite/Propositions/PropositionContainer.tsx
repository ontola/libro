import * as schema from '@ontologies/schema';
import {
  FC,
  useProperty,
} from 'link-redux';
import React from 'react';

import Proposition from '../../../components/SalesWebsite/Proposition';
import sales from '../../../ontology/sales';
import { containerTopology } from '../../../topologies';

const PropositionContainer: FC = () => {
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [color] = useProperty(schema.color);
  const [textColor] = useProperty(sales.textColor);

  return (
    <Proposition
      color={color.value}
      name={name.value}
      text={text.value}
      textColor={textColor.value}
    />
  );
};

PropositionContainer.type = sales.Proposition;

PropositionContainer.topology = containerTopology;

export default PropositionContainer;

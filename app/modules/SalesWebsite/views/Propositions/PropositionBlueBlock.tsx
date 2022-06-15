import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';

import sales from '../../ontology/sales';
import { blueBlockTopology } from '../../../../topologies';
import Proposition from '../../components/Proposition';

const PropositionBlueBlock: FC = () => {
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);

  return (
    <Proposition
      color="#FFF"
      name={name.value}
      text={text.value}
      textColor="#FFF"
    />
  );
};

PropositionBlueBlock.type = sales.Proposition;

PropositionBlueBlock.topology = blueBlockTopology;

export default PropositionBlueBlock;

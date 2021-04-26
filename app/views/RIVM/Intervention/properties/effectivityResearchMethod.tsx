import {
  FC,
  Property,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import rivm from '../../../../ontology/rivm';
import { cardMainTopology } from '../../../../topologies/Card/CardMain';

const EffectivityResearchMethod: FC<PropertyProps> = ({ linkedProp }) => {
  const researchSplit = linkedProp.value.split(',');
  const researched = researchSplit[0] === 'Ja';
  const researchMethod = researchSplit[1];

  return (
    <p>
      De effectiviteit van de interventie is na toepassing in het bedrijf
      <strong>{researched ? ' wel ' : ' niet '}</strong>
      in kaart gebracht
      {researched ? `, door middel van ${researchMethod}.` : '.'}
      <Property label={rivm.securityImproved} />
    </p>
  );
};

EffectivityResearchMethod.type = rivm.Intervention;

EffectivityResearchMethod.topology = cardMainTopology;

EffectivityResearchMethod.property = rivm.effectivityResearchMethod;

export default register(EffectivityResearchMethod);

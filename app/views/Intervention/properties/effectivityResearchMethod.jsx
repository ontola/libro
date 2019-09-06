import {
  Property,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { cardMainTopology } from '../../../topologies/Card/CardMain';

const EffectivityResearchMethod = ({ linkedProp }) => {
  const researchSplit = linkedProp.value.split(',');
  const researched = researchSplit[0] === 'Ja';
  const researchMethod = researchSplit[1];

  return (
    <p>
      De effectiviteit van de interventie is na toepassing in het bedrijf
      <strong> {researched ? 'wel' : 'niet'} </strong>
      in kaart gebracht
      {researched ? `, door middel van ${researchMethod}` : ''}.
      <Property label={NS.rivm('securityImproved')} />
    </p>
  );
};

EffectivityResearchMethod.type = NS.rivm('Intervention');

EffectivityResearchMethod.topology = cardMainTopology;

EffectivityResearchMethod.property = NS.rivm('effectivityResearchMethod');

EffectivityResearchMethod.propTypes = {
  linkedProp: linkedPropType,
};

export default register(EffectivityResearchMethod);

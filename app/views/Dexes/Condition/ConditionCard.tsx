import * as rdfx from '@ontologies/rdf';
import { Property, register } from 'link-redux';
import React from 'react';

import AttributeListItem from '../../../components/AttributeListItem';
import { HeadingSize } from '../../../components/Heading';
import { NAME_PREDICATES } from '../../../helpers/metaData';
import dexes from '../../../ontology/dexes';
import AttributeList from '../../../topologies/AttributeList';
import { cardTopology } from '../../../topologies/Card';
import { cardMainTopology } from '../../../topologies/Card/CardMain';

const ConditionCard = () => (
  <React.Fragment>
    <Property label={rdfx.type}>
      <Property
        label={NAME_PREDICATES}
        size={HeadingSize.SM}
      />
    </Property>
    <AttributeList>
      <AttributeListItem label={dexes.conditionText} />
      <AttributeListItem label={dexes.conditionDuration} />
      <AttributeListItem label={dexes.conditionAmount} />
    </AttributeList>
  </React.Fragment>
);

ConditionCard.type = dexes.Condition;

ConditionCard.topology = [
  cardTopology,
  cardMainTopology,
];

export default register(ConditionCard);

import {
  Resource,
  ReturnType,
  labelType,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Columns from '../../../components/Columns';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { CollectionViewTypes } from '../types';

const Views = ({ label }) => {
  const prop = useProperty(label, { returnType: ReturnType.AllStatements });

  if (prop.length === 1) {
    return <Resource forceRender subject={prop[0].object} />;
  }
  const obs = prop.map((iri) => <Resource key={`views-${iri.object.value}`} subject={iri.object} />);
  if (obs && obs.length > 1) {
    return <Columns>{obs}</Columns>;
  } else if (obs) {
    return obs;
  }

  return null;
};

Views.type = CollectionViewTypes;

Views.property = ontola.pages;

Views.topology = allTopologies;

Views.propTypes = {
  label: labelType,
};

export default register(Views);

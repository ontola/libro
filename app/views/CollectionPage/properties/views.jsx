import {
  Resource,
  labelType,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import { Columns } from '../../../components';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { CollectionViewTypes } from '../types';

const Views = ({ label, subject }) => {
  const lrs = useLRS();
  const prop = lrs.getResourcePropertyRaw(subject, label);

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
  subject: subjectType,
};

export default register(Views);

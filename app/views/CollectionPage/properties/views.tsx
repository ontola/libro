import {
  NamedNode,
  QuadPosition,
  SomeTerm,
} from '@ontologies/core';
import {
  FC,
  Resource,
  register,
  useQuadruples,
} from 'link-redux';
import React from 'react';

import Columns from '../../../components/Columns';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { CollectionViewTypes } from '../types';

interface ViewsProps {
  linkedProp: SomeTerm;
  label: NamedNode;
}

const Views: FC<ViewsProps> = ({ label }) => {
  const prop = useQuadruples(label);

  if (prop.length === 1) {
    return (
      <Resource
        forceRender
        subject={prop[0][QuadPosition.object]}
      />
    );
  }

  const obs = prop.map((iri) => (
    <Resource
      key={`views-${iri[QuadPosition.object].value}`}
      subject={iri[QuadPosition.object]}
    />
  ));

  if (obs && obs.length > 1) {
    return (
      <Columns>
        {obs}
      </Columns>
    );
  } else if (obs) {
    return (
      <React.Fragment>
        {obs}
      </React.Fragment>
    );
  }

  return null;
};

Views.type = CollectionViewTypes;

Views.property = ontola.pages;

Views.topology = allTopologies;

export default register(Views);

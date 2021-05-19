import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import React from 'react';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';

import { allTopologies } from '../../topologies';
import { componentMap } from '../../components';
import { handle } from '../../helpers/logging';
import elements from '../../ontology/elements';

const Element: FC = () => {
  const [type] = useProperty(rdfx.type);

  const [El] = componentMap[rdf.id(type)];
  if (!El) {
    handle(new Error(`Element for ${type.value} is ${El}`));

    return null;
  }

  return (
    // @ts-ignore
    <El>
      <Property label={elements.children} />
    </El>
  );
};

Element.type = [
  elements.P,
  elements.A,
  elements.Ol,
  elements.Ul,
  elements.Li,
  elements.H1,
  elements.H2,
  elements.Note,
  elements.Tip,
];

Element.topology = allTopologies;

export default register(Element);

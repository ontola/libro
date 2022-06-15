import * as as from '@ontologies/as';
import { NamedNode } from '@ontologies/core';
import {
  Property,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import ontola from '../../../../../ontology/ontola';
import {
  allTopologiesExcept,
  cardAppendixTopology,
  pageTopology,
} from '../../../../../topologies';
import CardRow from '../../../../../topologies/Card/CardRow';
import { CollectionTypes } from '../types';

const getPagination = (Wrapper: React.ElementType, topology: NamedNode | NamedNode[]) => {
  const InfinitePagination = () => {
    const pages = useProperty(ontola.pages);
    const lastPage = pages && pages[pages.length - 1];

    if (!lastPage) {
      return null;
    }

    return (
      <Resource subject={lastPage}>
        <Wrapper>
          <Property label={as.next} />
        </Wrapper>
      </Resource>
    );
  };

  InfinitePagination.type = CollectionTypes;

  InfinitePagination.property = ontola.infinitePagination;

  InfinitePagination.topology = topology;

  return InfinitePagination;
};

export const CardAppendixContent: React.FC = ({ children }) => (
  <CardRow
    backdrop
    borderTop
  >
    {children}
  </CardRow>
);

export default [
  register(getPagination(React.Fragment, allTopologiesExcept(cardAppendixTopology, pageTopology))),
  register(getPagination(CardAppendixContent, cardAppendixTopology)),
];

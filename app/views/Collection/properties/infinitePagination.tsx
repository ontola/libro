import * as as from '@ontologies/as';
import { NamedNode, SomeTerm } from '@ontologies/core';
import {
  FC,
  Property,
  Resource,
  ReturnType,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardRow from '../../../topologies/Card/CardRow';
import { pageTopology } from '../../../topologies/Page';
import { CollectionTypes } from '../types';

export interface InfinitePaginationProps {
  linkedProp: SomeTerm;
  pages: SomeTerm[];
}

const getPagination = (Wrapper: React.ElementType, topology: NamedNode | NamedNode[]) => {
  const InfinitePagination: FC<InfinitePaginationProps> = ({ pages }) => {
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

  InfinitePagination.mapDataToProps = {
    pages: {
      label: ontola.pages,
      returnType: ReturnType.AllTerms,
    },
  };

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

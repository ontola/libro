import as from '@ontologies/as';
import {
  Property,
  Resource,
  ReturnType,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardRow from '../../../topologies/Card/CardRow';
import { pageTopology } from '../../../topologies/Page';
import { CollectionTypes } from '../types';

const getPagination = (Wrapper, topology) => {
  const InfinitePagination = ({ pages }) => {
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

  InfinitePagination.propTypes = {
    pages: linkType,
  };

  return InfinitePagination;
};

export const CardAppendixContent = ({ children }) => (
  <CardRow backdrop>
    {children}
  </CardRow>
);
CardAppendixContent.propTypes = { children: PropTypes.node };

export default [
  register(getPagination(React.Fragment, allTopologiesExcept(cardAppendixTopology, pageTopology))),
  register(getPagination(CardAppendixContent, cardAppendixTopology)),
];

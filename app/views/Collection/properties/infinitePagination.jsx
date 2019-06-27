import {
  LinkedResourceContainer,
  linkType,
  Property,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../../topologies';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardRow from '../../../topologies/Card/CardRow';
import { CollectionTypes } from '../types';

const getPagination = (Wrapper, topology) => {
  const InfinitePagination = ({ pages }) => {
    const lastPage = pages && pages[pages.length - 1];

    if (!lastPage) {
      return null;
    }

    return (
      <LinkedResourceContainer subject={lastPage}>
        <Wrapper>
          <Property label={NS.as('next')} />
        </Wrapper>
      </LinkedResourceContainer>
    );
  };

  InfinitePagination.type = [...CollectionTypes, NS.argu('SearchResult')];

  InfinitePagination.property = NS.ontola('infinitePagination');

  InfinitePagination.topology = topology;

  InfinitePagination.mapDataToProps = {
    pages: {
      label: NS.as('pages'),
      limit: Infinity,
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
  register(getPagination(React.Fragment, allTopologiesExcept(cardAppendixTopology))),
  register(getPagination(CardAppendixContent, cardAppendixTopology)),
];

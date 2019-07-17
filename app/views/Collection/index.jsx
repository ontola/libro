import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  link,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { NS } from '../../helpers/LinkedRenderStore';
import { alertDialogTopology } from '../../topologies/Dialog';
import { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import CardList, { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { cardVoteEventTopology } from '../../topologies/CardVoteEvent';
import Container from '../../topologies/Container';
import { gridTopology } from '../../topologies/Grid';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { tabPaneTopology } from '../../topologies/TabPane';
import { voteEventTopology } from '../../topologies/VoteEvent';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

import getCollection from './getCollection';
import CreateAction from './properties/createAction';
import CollectionFrame from './properties/collectionFrame';
import FilteredCollections from './properties/filteredCollections';
import Name from './properties/name';
import UnreadCount from './properties/unreadCount';
import Pages from './properties/pages';
import InfinitePagination from './properties/infinitePagination';
import DefaultPagination from './properties/defaultPagination';
import { CollectionTypes } from './types';
import voteEvent from './voteEvent';
import CollectionCardAppendix from './CollectionCardAppendix';
import CollectionContainer from './CollectionContainer';
import CollectionNavbar from './CollectionNavbar';
import CollectionTableCell from './CollectionTableCell';
import Header from './properties/header';
import TotalItems from './properties/totalItems';

import './Collection.scss';

const collectionSection = ({ omniform = false, renderWhenEmpty = false } = {}) => {
  const CollectionSection = ({ direction, totalItems }) => {
    const pagesShouldRender = renderWhenEmpty || totalItems.value !== '0';

    return (
      <CardContent noStartSpacing>
        <CardList direction={direction}>
          {pagesShouldRender && <Property forceRender insideCollection label={NS.as('pages')} />}
          <Property label={NS.ontola('createAction')} omniform={omniform} />
        </CardList>
      </CardContent>
    );
  };

  CollectionSection.propTypes = {
    direction: PropTypes.oneOf(['column']),
    totalItems: linkType,
  };

  return CollectionSection;
};

const itemsCount = {
  totalItems: {
    label: NS.as('totalItems'),
  },
};

export default [
  CollectionContainer,
  CollectionNavbar,
  CollectionTableCell,
  register(
    getCollection({
      WrappingElement: Container,
      redirect: true,
      renderParent: true,
      renderWhenEmpty: true,
      topology: [
        alertDialogTopology,
        primaryResourceTopology,
        pageTopology,
      ],
    })
  ),
  LinkedRenderStore.registerRenderer(
    link(itemsCount)(collectionSection({ omniform: true })),
    CollectionTypes,
    RENDER_CLASS_NAME,
    [
      cardTopology,
      cardFixedTopology,
      cardListTopology,
      cardMainTopology,
      cardRowTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    link(itemsCount)(collectionSection({ renderWhenEmpty: false })),
    CollectionTypes,
    RENDER_CLASS_NAME,
    [
      cardVoteEventTopology,
      voteEventTopology,
    ]
  ),
  register(
    getCollection({
      renderWhenEmpty: true,
      topology: [
        gridTopology,
        widgetTopologyTopology,
      ],
    })
  ),
  register(
    getCollection({
      WrappingElement: Container,
      renderWhenEmpty: true,
      topology: [
        tabPaneTopology,
      ],
    })
  ),
  ...TotalItems,
  CollectionCardAppendix,
  ...CollectionFrame,
  CreateAction,
  ...FilteredCollections,
  ...Header,
  Name,
  ...UnreadCount,
  ...Pages,
  ...InfinitePagination,
  ...DefaultPagination,
  ...voteEvent,
];
